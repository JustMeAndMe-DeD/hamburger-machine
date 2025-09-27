import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburger-machine',
  templateUrl: './hamburger-machine.component.html',
  styleUrls: ['./hamburger-machine.component.css']
})
export class HamburgerMachineComponent {
  showButtons: boolean = true;
  showIngredients: boolean = false;
  showAderezos: boolean = false;
  showBebidas: boolean = false;
  selectedIngredients: string[] = [];
  selectedAderezos: string[] = [];
  selectedBebidas: string[] = [];
  selectedType: string = '';
  orderSummary: string = ''; // 👈 Agregada como propiedad de la clase

  // Mapeo para obtener nombres de ingredientes hardcodeados
  private ingredientNames: { [key: string]: string } = {
    'huevo': 'Huevo',
    'pepino': 'Pepino',
    'fiambre': 'Fiambre',
    'tomate': 'Tomate',
    'queso': 'Queso',
    'cheluga': 'Cheluga'
  };

  // Mapeo para nombres de aderezos
  private aderezoNames: { [key: string]: string } = {
    'mayo_extra': 'Mayonesa Extra',
    'ketchup_extra': 'Ketchup Extra',
    'mustard_extra': 'Mostaza Extra',
    'bbq_sauce': 'Salsa BBQ',
    'ranch': 'Salsa Ranch',
    'chipotle': 'Salsa Chipotle'
  };

  // Mapeo para bebidas
  private bebidaNames: { [key: string]: string } = {
    'coke': 'Coca Cola',
    'fanta': 'Fanta',
    'sprite': 'Sprite',
    'agua': 'Agua',
    'jugo_naranja': 'Jugo de Naranja',
    'te_helado': 'Té Helado'
  };

  selectOption(option: string) {
    console.log('Opción seleccionada:', option);
    this.selectedType = option;
    this.showButtons = false;
    this.showIngredients = true;
    this.selectedIngredients = []; // Resetear ingredientes al cambiar tipo
    this.selectedAderezos = []; // Resetear aderezos
    this.selectedBebidas = []; // Resetear bebidas
  }

  toggleIngredient(ingredientId: string) {
    const index = this.selectedIngredients.indexOf(ingredientId);
    
    if (index > -1) {
      // Si ya está seleccionado, lo quitamos
      this.selectedIngredients.splice(index, 1);
      console.log('Ingrediente removido:', ingredientId);
    } else {
      // Si no está seleccionado, lo agregamos
      this.selectedIngredients.push(ingredientId);
      console.log('Ingrediente agregado:', ingredientId);
    }
    
    console.log('Ingredientes seleccionados:', this.selectedIngredients);
  }

  toggleAderezo(aderezoId: string) {
    const index = this.selectedAderezos.indexOf(aderezoId);
    
    if (index > -1) {
      // Si ya está seleccionado, lo quitamos
      this.selectedAderezos.splice(index, 1);
      console.log('Aderezo removido:', aderezoId);
    } else {
      // Si no está seleccionado, lo agregamos
      this.selectedAderezos.push(aderezoId);
      console.log('Aderezo agregado:', aderezoId);
    }
    
    console.log('Aderezos seleccionados:', this.selectedAderezos);
  }

  // Método para bebidas
  toggleBebida(bebidaId: string) {
    const index = this.selectedBebidas.indexOf(bebidaId);
    
    if (index > -1) {
      this.selectedBebidas.splice(index, 1);
      console.log('Bebida removida:', bebidaId);
    } else {
      this.selectedBebidas.push(bebidaId);
      console.log('Bebida agregada:', bebidaId);
    }
    
    console.log('Bebidas seleccionadas:', this.selectedBebidas);
  }

  isIngredientSelected(ingredientId: string): boolean {
    return this.selectedIngredients.includes(ingredientId);
  }

  isAderezoSelected(aderezoId: string): boolean {
    return this.selectedAderezos.includes(aderezoId);
  }

  // Verificar si bebida está seleccionada
  isBebidaSelected(bebidaId: string): boolean {
    return this.selectedBebidas.includes(bebidaId);
  }

  canContinueFromIngredients(): boolean {
    return this.selectedIngredients.length > 0;
  }

  canContinueFromAderezos(): boolean {
    return this.selectedAderezos.length > 0;
  }

  // Validar bebidas
  canContinueFromBebidas(): boolean {
    return this.selectedBebidas.length > 0;
  }

  continueToAderezos() {
    if (this.canContinueFromIngredients()) {
      console.log('Continuando a aderezos con ingredientes:', this.selectedIngredients);
      this.showIngredients = false;
      this.showAderezos = true;
    }
  }

  continueToBebidas() {
    if (this.canContinueFromAderezos()) {
      // Ahora va a bebidas en lugar de finalizar
      console.log('Continuando a bebidas desde aderezos:', this.selectedAderezos);
      this.showAderezos = false;
      this.showBebidas = true;
    }
  }

  // Continuar desde bebidas (finalizar orden)
  continueFromBebidas() {
    if (this.canContinueFromBebidas()) {
      // Obtener nombres de todos los elementos seleccionados
      const selectedIngredientNames = this.selectedIngredients.map(id => 
        this.ingredientNames[id]
      ).filter(name => name);

      const selectedAderezoNames = this.selectedAderezos.map(id => 
        this.aderezoNames[id]
      ).filter(name => name);

      const selectedBebidaNames = this.selectedBebidas.map(id => 
        this.bebidaNames[id]
      ).filter(name => name);

      console.log('Orden completa finalizada:', {
        type: this.selectedType,
        ingredients: this.selectedIngredients,
        ingredientNames: selectedIngredientNames,
        aderezos: this.selectedAderezos,
        aderezoNames: selectedAderezoNames,
        bebidas: this.selectedBebidas,
        bebidaNames: selectedBebidaNames
      });
      
      // 👈 Ahora asignamos a la propiedad de clase
      this.orderSummary = `¡Orden completada!\n\n` +
                         `Hamburguesa: ${this.selectedType}\n` +
                         `Ingredientes: ${selectedIngredientNames.join(', ')}\n`;
      
      if (selectedAderezoNames.length > 0) {
        this.orderSummary += `Aderezos: ${selectedAderezoNames.join(', ')}\n`;
      }
      
      if (selectedBebidaNames.length > 0) {
        this.orderSummary += `Bebidas: ${selectedBebidaNames.join(', ')}`;
      }
      
      alert(this.orderSummary);
      // NO resetear inmediatamente - mantener orderSummary para WhatsApp
      // this.resetOrder();
    }
  }

  goBackFromIngredients() {
    this.showButtons = true;
    this.showIngredients = false;
    this.selectedIngredients = [];
    this.selectedAderezos = [];
    this.selectedBebidas = [];
    this.selectedType = '';
  }

  goBackFromAderezos() {
    this.showIngredients = true;
    this.showAderezos = false;
    this.selectedAderezos = [];
    this.selectedBebidas = [];
  }

  // Volver desde bebidas
  goBackFromBebidas() {
    this.showAderezos = true;
    this.showBebidas = false;
    this.selectedBebidas = [];
  }

  skipAderezos() {
    // Ahora va a bebidas en lugar de finalizar
    console.log('Saltando aderezos, yendo a bebidas');
    this.showAderezos = false;
    this.showBebidas = true;
  }

  // Saltar bebidas
  skipBebidas() {
    // Permitir finalizar sin bebidas
    const selectedIngredientNames = this.selectedIngredients.map(id => 
      this.ingredientNames[id]
    ).filter(name => name);

    const selectedAderezoNames = this.selectedAderezos.map(id => 
      this.aderezoNames[id]
    ).filter(name => name);

    console.log('Orden finalizada sin bebidas:', {
      type: this.selectedType,
      ingredients: this.selectedIngredients,
      ingredientNames: selectedIngredientNames,
      aderezos: this.selectedAderezos,
      aderezoNames: selectedAderezoNames
    });
    
    // 👈 Ahora asignamos a la propiedad de clase
    this.orderSummary = `¡Orden completada!\n\n` +
                       `Hamburguesa: ${this.selectedType}\n` +
                       `Ingredientes: ${selectedIngredientNames.join(', ')}\n`;
    
    if (selectedAderezoNames.length > 0) {
      this.orderSummary += `Aderezos: ${selectedAderezoNames.join(', ')}\n`;
    }
    
    this.orderSummary += `Sin bebidas adicionales`;
    
    alert(this.orderSummary);
    // NO resetear inmediatamente - mantener orderSummary para WhatsApp
    // this.resetOrder();
  }

  resetOrder() {
    this.showButtons = true;
    this.showIngredients = false;
    this.showAderezos = false;
    this.showBebidas = false;
    this.selectedIngredients = [];
    this.selectedAderezos = [];
    this.selectedBebidas = [];
    this.selectedType = '';
    this.orderSummary = ''; // 👈 Limpiar el resumen de orden
  }

  getSelectedIngredientsCount(): number {
    return this.selectedIngredients.length;
  }

  getSelectedAderezosCount(): number {
    return this.selectedAderezos.length;
  }

  // Contar bebidas seleccionadas
  getSelectedBebidasCount(): number {
    return this.selectedBebidas.length;
  }

  // Helper para obtener el nombre de un ingrediente por ID
  getIngredientName(id: string): string {
    return this.ingredientNames[id] || '';
  }

  // Helper para obtener el nombre de un aderezo por ID
  getAderezoName(id: string): string {
    return this.aderezoNames[id] || '';
  }

  // Helper para obtener el nombre de una bebida por ID
  getBebidaName(id: string): string {
    return this.bebidaNames[id] || '';
  }

  // 👈 Método adicional para obtener la URL de WhatsApp ya formateada
  getWhatsAppUrl(): string {
    if (!this.orderSummary) return '#';
    return `https://api.whatsapp.com/send?phone=+5493434579277&text=${encodeURIComponent(this.orderSummary)}`;
  }

  // 👈 Generar orderSummary en tiempo real para WhatsApp
  generateCurrentOrderSummary(): string {
    if (!this.selectedType || this.selectedIngredients.length === 0) {
      return '';
    }

    const selectedIngredientNames = this.selectedIngredients.map(id => 
      this.ingredientNames[id]
    ).filter(name => name);

    const selectedAderezoNames = this.selectedAderezos.map(id => 
      this.aderezoNames[id]
    ).filter(name => name);

    const selectedBebidaNames = this.selectedBebidas.map(id => 
      this.bebidaNames[id]
    ).filter(name => name);

    let summary = `Mi orden de hamburguesa:\n\n` +
                  `Hamburguesa: ${this.selectedType}\n` +
                  `Ingredientes: ${selectedIngredientNames.join(', ')}\n`;
    
    if (selectedAderezoNames.length > 0) {
      summary += `Aderezos: ${selectedAderezoNames.join(', ')}\n`;
    }
    
    if (selectedBebidaNames.length > 0) {
      summary += `Bebidas: ${selectedBebidaNames.join(', ')}`;
    }

    return summary;
  }

  // 👈 URL de WhatsApp con orden actual
  getCurrentWhatsAppUrl(): string {
    const currentOrder = this.generateCurrentOrderSummary();
    if (!currentOrder) return '#';
    return `https://api.whatsapp.com/send?phone=+5493434579277&text=${encodeURIComponent(currentOrder)}`;
  }

  // 👈 Método para reiniciar y empezar nueva orden
  startNewOrder() {
    this.resetOrder();
  }
}