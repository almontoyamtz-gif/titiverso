/**
 * TITIVERSO HQ 3.0
 * Agente Orquestador - Version inicial
 *
 * Organiza el trabajo de los especialistas.
 * La conexion con IA y Supabase vendra despues.
 */

export const AGENTES = {
  producto: {
    nombre: "Producto IA",
    responsabilidad: "Productos, servicios y desarrollo"
  },
  finanzas: {
    nombre: "Finanzas IA",
    responsabilidad: "Costos, presupuestos y rentabilidad"
  },
  marketing: {
    nombre: "Marketing IA",
    responsabilidad: "Campanas y posicionamiento"
  },
  comercial: {
    nombre: "Comercial IA",
    responsabilidad: "Ventas y clientes"
  },
  operaciones: {
    nombre: "Operaciones IA",
    responsabilidad: "Procesos, proveedores y ejecucion"
  },
  diseno: {
    nombre: "Diseno IA",
    responsabilidad: "Identidad visual y experiencia"
  },
  creatividad: {
    nombre: "Creatividad IA",
    responsabilidad: "Ideas e innovacion"
  },
  legal: {
    nombre: "Legal IA",
    responsabilidad: "Contratos y requisitos legales"
  },
  investigacion: {
    nombre: "Investigacion IA",
    responsabilidad: "Mercados, tendencias y competencia"
  }
};

export function crearPlan(objetivo, proyectoId) {
  if (!objetivo?.trim() || !proyectoId) {
    throw new Error("Se requiere objetivo y proyecto");
  }

  const texto = objetivo.toLowerCase();
  const seleccion = new Set();

  const reglas = {
    producto: /producto|ropa|servicio|coleccion|app/,
    finanzas: /presupuesto|costo|precio|inversion|rentabilidad/,
    marketing: /marketing|marca|lanzamiento|publicidad/,
    comercial: /venta|cliente|comercial|ingreso/,
    operaciones: /proveedor|logistica|operacion|fabricacion/,
    diseno: /diseno|logo|visual|imagen/,
    creatividad: /idea|innovacion|creatividad/,
    legal: /contrato|legal|registro|normativa/,
    investigacion: /mercado|competencia|investigacion/
  };

  for (const [id, patron] of Object.entries(reglas)) {
    if (patron.test(texto)) seleccion.add(id);
  }

  if (seleccion.size === 0) {
    seleccion.add("investigacion");
    seleccion.add("finanzas");
  }

  return {
    proyectoId,
    objetivo: objetivo.trim(),
    estado: "pendiente",
    requiereAprobacion: true,
    tareas: [...seleccion].map(id => ({
      agenteId: id,
      agente: AGENTES[id].nombre,
      instruccion: `Analizar el objetivo: ${objetivo}`,
      estado: "pendiente"
    }))
  };
}
