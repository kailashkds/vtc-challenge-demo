<?php

namespace App\Form;

use App\Entity\Category;
use App\Entity\Notes;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NotesType extends AbstractType
{
    const NEW = 'new';
    const TODO = 'to-do';
    const DONE = 'done';
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title',TextType::class)
            ->add('content',TextType::class)
            ->add('status',ChoiceType::class,[
                'choices' => [
                    self::NEW => self::NEW,
                    self::TODO => self::TODO,
                    self::DONE => self::DONE
                ]
            ])
            ->add('category',EntityType::class,[
                "class" => Category::class
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Notes::class,
            'csrf_protection' => false,
        ]);
    }
}
