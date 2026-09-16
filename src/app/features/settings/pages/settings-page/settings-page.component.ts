import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
  disabled: boolean;
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  private fb = inject(FormBuilder);

  // Manejo de la pestaña activa con Signals
  activeTab = signal<string>('general');

  // Menú lateral de configuración
  tabs: SettingsTab[] = [
    { id: 'general', label: 'General', icon: 'settings', disabled: false },
    { id: 'miembros', label: 'Miembros del equipo', icon: 'person', disabled: true },
    { id: 'categorias', label: 'Categorías y prioridades', icon: 'filter_alt', disabled: true },
    { id: 'notificaciones', label: 'Notificaciones', icon: 'notifications', disabled: true }
  ];

  // Formulario reactivo para la sección General
  generalForm = this.fb.nonNullable.group({
    nombre: ['Operaciones', Validators.required],
    descripcion: ['Equipo de soporte y operaciones internas.', Validators.required]
  });

  setTab(tabId: string, disabled: boolean) {
    if (disabled) return; // Previene clics en opciones inactivas por ahora
    this.activeTab.set(tabId);
  }

  onSubmit() {
    if (this.generalForm.valid) {
      console.log('Guardando configuración:', this.generalForm.getRawValue());
      // Lógica de guardado en tu servicio
    }
  }

  onCancel() {
    // Restablece los valores a los originales (simulando cancelar)
    this.generalForm.reset({
      nombre: 'Operaciones',
      descripcion: 'Equipo de soporte y operaciones internas.'
    });
  }
}
