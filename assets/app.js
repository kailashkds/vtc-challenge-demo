/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import { createRoot } from "react-dom/client";
import App from "../react/App";
import {AuthProvider} from "../react/Auth/AuthContext";


const rootNode = createRoot(
    document.getElementById('app')
);

rootNode.render(
    <React.StrictMode>
            <App />
    </React.StrictMode>,)
