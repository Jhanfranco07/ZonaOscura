---
name: Utilitarian Wireframe
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#585f6a'
  on-secondary: '#ffffff'
  secondary-container: '#dce3f0'
  on-secondary-container: '#5e6570'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1f'
  on-tertiary-container: '#818488'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#dce3f0'
  secondary-fixed-dim: '#c0c7d3'
  on-secondary-fixed: '#151c25'
  on-secondary-fixed-variant: '#404752'
  tertiary-fixed: '#e0e2e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1f'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  titulo-principal:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  titulo-seccion:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  subtitulo:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  texto-general:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  etiqueta:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
---

## Brand & Style
The objective of this design system is to provide a structured, high-clarity environment for "ZonaOscura" that prioritizes function over form while maintaining a professional aesthetic. The style is strictly **Minimalist** and **Corporate**, utilizing a monochromatic palette to reduce cognitive load and focus the user's attention on hierarchy and data structure. 

The UI evokes a sense of reliability and precision. By removing the distraction of color, this design system emphasizes spatial relationships, logical grouping, and clear typographic signposting, making it ideal for complex desktop workflows.

## Colors
The palette is a disciplined grayscale spectrum designed to create immediate visual depth without chromatic interference.
- **Surface & Backgrounds**: Use White (#FFFFFF) for primary content cards and containers. The Page Background uses Very Light Gray (#F9FAFB) to provide a soft contrast that defines the edges of the application workspace.
- **Structural Elements**: Light Gray (#E5E7EB) is reserved for borders, dividers, and the background of the sidebar to distinguish navigation from content.
- **Interactive & Text**: Dark Gray/Black (#111827) is used for primary actions and high-priority text. Medium Gray (#9CA3AF) provides a secondary layer for supporting information and icons.

## Typography
This design system utilizes **Inter** for its exceptional readability on digital screens and its neutral, utilitarian character. 

The typographic hierarchy is strictly enforced to guide the user through the interface:
- **Títulos**: Bold and Semibold weights are used to anchor the page and individual modules.
- **Cuerpo de texto**: Standardized at 16px to ensure accessibility and comfort during long periods of use.
- **Etiquetas**: Smaller 13px text is used for metadata, micro-copy, and form labels, ensuring they remain distinct from user-generated content.

## Layout & Spacing
The application follows a **Fixed Grid** model constrained to a maximum width of 1440px, centered in the viewport. 

- **Sidebar (Lateral Izquierda)**: Fixed at 250px. This area uses the Light Gray (#E5E7EB) background to create a clear vertical anchor for navigation.
- **Navegación Superior**: Fixed at 80px height. It remains white to blend with content cards but is separated by a 1px border.
- **Content Area**: Utilizes a 12-column grid with 24px gutters. All internal margins follow an 8px base unit (8, 16, 24, 32) to maintain rhythmic consistency across the application.

## Elevation & Depth
Depth in this design system is communicated through a combination of **Tonal Layers** and **Subtle Shadows**. 

- **Level 0**: Page background (#F9FAFB).
- **Level 1**: Sidebar and secondary containers (#E5E7EB or #FFFFFF with 1px border).
- **Level 2**: Main content cards and modals. These use a White (#FFFFFF) fill and a very soft, diffused shadow (0px 4px 6px rgba(0,0,0,0.05)) to suggest they are "floating" slightly above the base.
- **Interaction**: Borders should darken slightly on hover, and buttons may utilize a tighter, more defined shadow to indicate clickability.

## Shapes
A consistent **8px (0.5rem)** corner radius is applied to all primary components, including buttons, input fields, and cards. This moderate rounding strikes a balance between the clinical feel of sharp corners and the overly casual nature of fully rounded pills.

Icons must be **Linear** (outlines only) with a 2px stroke weight, rendered in Dark Gray (#111827) to maintain visual harmony with the primary text.

## Components
Consistent component behavior is vital for the utility of this design system:

- **Botones**: 
  - *Primario*: Background #111827, Text #FFFFFF, 8px radius.
  - *Secundario*: Background #FFFFFF, Border #E5E7EB, Text #111827.
- **Campos de Entrada (Inputs)**: White background, 1px border (#E5E7EB), 8px radius. Text inside uses "Texto general" (16px). Placeholder text uses "Medium Gray" (#9CA3AF).
- **Tarjetas (Cards)**: White background, 1px border (#E5E7EB), subtle shadow, 8px radius. Used for grouping related data.
- **Listas**: Items separated by 1px horizontal lines (#E5E7EB). Hover state utilizes a #F9FAFB background shift.
- **Iconografía**: All icons are linear, 24x24px bounding box, Dark Gray (#111827).
- **Navegación**: The sidebar links should use "Subtítulos" (18px) for category headers and "Texto general" (16px) for individual items.