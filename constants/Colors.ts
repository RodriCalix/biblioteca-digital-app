/**
 * ============================================================================
 * ARCHIVO: constants/Colors.ts
 * DESCRIPCIÓN: Configuración de colores para temas claro (light) y oscuro (dark).
 * Proporciona los valores de color predeterminados para la interfaz y pestañas
 * según el esquema de color del sistema operativo.
 * ============================================================================
 */

// Color de acento para el tema claro
const tintColorLight = '#2f95dc';
// Color de acento para el tema oscuro
const tintColorDark = '#fff';

export default {
  // Paleta de colores para el tema claro (Light Mode)
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  // Paleta de colores para el tema oscuro (Dark Mode)
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

