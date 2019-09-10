import React from 'react';

import { renderWithRouter } from '../../../../../../tests/test-utils';
import ResultsContentItem from '../ResultsContentItem';
const defaultProps = {
  beach:  {
    "id": "1865",
    "comunidad_autonoma": "Cantabria",
    "provincia": "Cantabria",
    "isla": "",
    "codigo_ine_municipio": "39011",
    "termino_municipal": "Bareyo",
    "web_municipal": "http://www.aytobareyo.org",
    "identificador": "800",
    "nombre": "Antuerta",
    "nombre_alternativo": "",
    "nombre_alternativo_2": "",
    "descripcion": "Pequeña playa colindante a la de Cuberris, enclavada en un entorno rocoso. Tiene fuertes corrientes y es muy frecuentada por surfistas. No ofrece ningún tipo de servicio.",
    "longitud": "100 metros",
    "anchura": "40 metros",
    "variacion_anchura": "Mucha",
    "grado_ocupacion": "Bajo",
    "grado_urbanizacion": "Aislada",
    "paseo_maritimo": "No",
    "tipo_paseo_maritimo": "",
    "tipo_de_arena": "Dorada",
    "condiciones_baño": "Oleaje fuerte / Ventosa",
    "zona_fondeo_balizada": "No",
    "nudismo": "No",
    "vegetacion": "No",
    "vegetacion_lugar": "",
    "actuaciones": "",
    "actuaciones_tipo": "",
    "bandera_azul": "Sí", //mocked
    "auxilio_y_salvamento": "Sí",
    "auxilio_y_salvamento_desc": "",
    "señalizacion_peligro": "Sí",
    "señalizacion_peligro_desc": "Banderas",
    "forma_de_acceso": "A pie fácil",
    "señalizacion_accesos": "No",
    "acceso_discapacitados": "No",
    "carretera_mas_proxima": "CA-446",
    "autobus": "Sí",
    "autobus_tipo": "Interurbano",
    "aparcamiento": "No",
    "aparcamiento_seguridad": "",
    "aparcamiento_num_plazas": "",
    "aseos": "No",
    "lavapies": "No",
    "duchas": "No",
    "telefonos": "No",
    "papelera": "Sí",
    "servicio_limpieza": "Sí",
    "alquiler_sombrillas": "No",
    "alquiler_hamacas": "No",
    "alquiler_nauticos": "No",
    "oficina_turismo": "No",
    "establecimiento_comida": "No",
    "establecimiento_bebida": "No",
    "zona_infantil": "No",
    "zona_deportiva": "No",
    "club_nautico": "No",
    "submarinismo": "No",
    "zona_surf": "Sí",
    "observaciones": "Emergencias (112).",
    "coordenada_x": "-3,6196",
    "coordenada_y": "43,4966",
    "huso": "30",
    "coordenada_geografica_longitud": "03º 37' 10,801'' W",
    "coordenada_geografica_latitud": "43º 29' 47,996'' N",
    "puerto_deportivo": "Puerto de Laredo",
    "web_puerto_deportivo": "http://www.puertodelaredo.com",
    "distancia_puerto_deportivo": "30 km",
    "hospital": "Hospital Comarcal de Laredo",
    "direccion_hospital": "Avda. de los Derechos Humanos, s/n (Laredo)",
    "telefono_hospital": "942638500",
    "distancia_hospital": "30 km.",
    "composicion": "Arena",
    "fachada_litoral": "Acantilado",
    "espacio_protegido": "Sí",
    "espacio_protegido_desc": "ZEC Costa Central y Ría de Ajo (RN2000)",
    "links": "http://sig.mapama.gob.es/93/ClienteWS/Guia-Playas/Default.aspx?nombre=PLAYAS_WEB&claves=DGC.PLAYAS.PLY_CO_PLAYA&valores=800",
    "images": "https://servicio.mapama.gob.es/imagenes/DGC/GuiaPlayasv2/img_sig/NoDisponible.jpg,https://servicio.mapama.gob.es/imagenes/DGC/GuiaPlayasv2/img_sig/s/ply800_imgS-121.jpg"
  },
  remainingPhotos: 2,
  regionId: 'ES-CB'
}

test('<ResultContentItem /> renders ok', ()=> {
  const route = '/spain-map/Cantabria'
  const { getByTestId} = renderWithRouter(<ResultsContentItem {...defaultProps} />, route);
  const rootElement = getByTestId('results-item');
  expect(rootElement).toBeInTheDocument()
});

test('<ResultContentItem /> renders with correct features names and order ', ()=>{
  const route = '/spain-map/Cantabria';
  const { getAllByTestId } = renderWithRouter(<ResultsContentItem {...defaultProps}/>, route);
  const arrayOfFeatures = getAllByTestId('feature-item');
  const length = '100 m';
  const shower = null;
  const beachBar = null;
  const lifeGuard = 'lifeguard';
  const nudism = null;
  const surf = 'surf'
  const diving = null;
  const blueFlag = 'blue-flag';
  let features = [];
  features.push(length, shower, beachBar, lifeGuard, nudism, surf, diving, blueFlag)
  features = features.filter(el => el !== null);
  // number of features included
  expect(arrayOfFeatures.length).toBe(4);
  // features name and order
  expect(arrayOfFeatures[0]).toHaveTextContent(features[0]);
  expect(arrayOfFeatures[1]).toHaveTextContent(features[1]);
  expect(arrayOfFeatures[2]).toHaveTextContent(features[2]);
  expect(arrayOfFeatures[3]).toBeInTheDocument();
  
})
// test.only('<ResultContentItem /> click on image lead to details page', async ()=> {
//   const route = '/spain-map/Cantabria'
//   const { getByTestId, queryByTestId} = renderWithRouter(<ResultsContentItem {...defaultProps} />, route);
//   const imageElement = getByTestId('image-wrapper');
//   const leftButton = { button: 0};
//   fireEvent.click(imageElement, leftButton);
 
// });