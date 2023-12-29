import React, {useEffect, useState} from "react";
import {TextField, Button, Grid, Paper, FormControl, InputLabel} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Footer from "../layout/footer";
import Header from "../layout/header";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {createNotes, filterRows, getListOfCategories, getListOfNotes} from "../Api";
import {useAuth} from "../Auth/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom";
import {KEY_DONE, KEY_NEW, KEY_TODO, MENU_ITEMS} from "../Constants";

const Notes = () => {
    const { token } = useAuth();
    const [notes,setNotes] = useState([]);
    const [categoryList,setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { navigate } = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        status: ''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await createNotes(formData,token);
        setFormData({
            ...formData,
            title: "",
            category: "",
            content: "",
            status: ""
        });
        const notes = await getListOfNotes(token);
        setNotes(notes)
    };
    const fetchData = async () => {
        try {
            const data = await getListOfCategories(token);
            setCategoryList(data);
            setLoading(true);
        } catch (error) {
            // Handle errors if needed
            console.error('Error fetching categories:', error);
        }
    };

    const fetchNotes = async () => {
        try {
            const notes = await getListOfNotes(token);
            setNotes(notes)
            setLoading(true);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchNotes();
    }, []);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
            <Header />
                <Paper elevation={3} style={{ padding: "20px", margin: "20px", borderRadius: "10px" }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.title}
                                    onChange={handleChange}
                                    name="title"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Content"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.content}
                                    onChange={handleChange}
                                    name="content"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={formData.category}
                                    label="Category"
                                    variant="outlined"
                                    fullWidth  // Set the Select component to full width
                                    onChange={handleChange}
                                    name="category"
                                    required
                                    select
                                >
                                    {categoryList?.map((value) => (
                                        <MenuItem key={value.id} value={value.id}>
                                            {value.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                        style={{ width: "100%" }}
                                        label="Status"
                                        variant="outlined"
                                        fullWidth  // Set the Select component to full width
                                        onChange={handleChange}
                                        name="status"
                                        required
                                        select
                                        value={formData.status}
                                    >
                                    <MenuItem key={KEY_NEW} value={KEY_NEW}>
                                        {capitalizeFirstLetter(KEY_NEW)}
                                    </MenuItem>
                                    <MenuItem key={KEY_TODO} value={KEY_TODO}>
                                        {capitalizeFirstLetter(KEY_TODO)}
                                    </MenuItem>
                                    <MenuItem key={KEY_DONE} value={KEY_DONE}>
                                        {capitalizeFirstLetter(KEY_DONE)}
                                    </MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Save Note
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
            </Paper>
            <NoteDataTable token={token} notes={notes} loading={loading} setNotes={setNotes}/>
            <Footer />
        </>
    );
};

const NoteDataTable = ({token,notes,loading,setNotes}) => {
    const styles = {
        loaderContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto', // Adjust the height as needed
        },
    };
    const [type,setType] = useState('title');
    const [value,setValue] = useState('value');
    const {apiRef} = useGridApiRef();
    const [rows,setRows] = useState(notes);
    const columns = [
        { field: "title", headerName: "Title", flex: 1 },
        { field: "content", headerName: "Content", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
    ];

    const handleFilterChange = async (e) => {
        const filterData = await filterRows(token,type,value)
        setNotes(filterData)
        apiRef.current?.setRows(notes);
    };

    const handleClearFilterChange = async (e) => {
        setType("")
        setValue("")
        const notes = await getListOfNotes(token);
        setNotes(notes)
        apiRef.current?.setRows(notes);
    };
   return (
       <Paper elevation={3} style={{ padding: "20px", margin: "20px", borderRadius: "10px", height: '500px', }}>
           <div style={{ marginTop: "30px", height: "400px" }}>
            <Grid container spacing={3}>
                {/* First column */}
                <Grid item xs={4}>
                    <TextField
                        style={{ width: "100%" }}
                        variant="outlined"
                        onChange={(e) => setType(e.target.value)}
                        select
                        label="Filter By"
                    >

                        {MENU_ITEMS .map(item => (
                            <MenuItem key={item.key} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Second column */}
                <Grid item xs={4}>
                    <TextField
                        label="Filter by keyword"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Grid>

                {/* Third column */}
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={handleFilterChange}>
                        Apply Filter
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClearFilterChange}
                        style={{ marginLeft: "8px" }}
                    >
                        Clear Filter
                    </Button>
                </Grid>
            </Grid>

            <br/>

            {loading ? <DataGrid
                apiRef={apiRef}
                rows={notes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
            /> :
                <div style={styles.loaderContainer}>
                    <CircularProgress />
                </div>
            }
        </div>
       </Paper>
    );
};

export default Notes;
