import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Container, Title, FormGroup, LayerContainer, LayerTitle,
  Info, CalculationResult, MaxOverburdenBox, Button, AddLayerButton
} from './PileCalculator.styles.js';

const soilTypes = [
  'High Plasticity Clay (CH)', 'Medium Plasticity Clay (CI)', 'Low Plasticity Clay (CL)',
  'Poorly Graded Sand (SP)', 'Well Graded Sand (SW)', 'Silty Sand (SM)'
];

const angleData = [
  { angle: 0, Nq: 1.00, Ng: 0.00 },
  { angle: 5, Nq: 1.57, Ng: 0.45 },
  { angle: 10, Nq: 2.47, Ng: 1.22 },
  { angle: 15, Nq: 3.94, Ng: 2.65 },
  { angle: 20, Nq: 6.40, Ng: 5.39 },
  { angle: 25, Nq: 10.03, Ng: 10.88 },
  { angle: 30, Nq: 20.95, Ng: 22.40 },
  { angle: 35, Nq: 48.50, Ng: 48.03 },
  { angle: 40, Nq: 130.16, Ng: 109.41 }
];

const interpolate = (input, data, key) => {
  if (input <= data[0].angle) return data[0][key];
  if (input >= data[data.length - 1].angle) return data[data.length - 1][key];
  for (let i = 0; i < data.length - 1; i++) {
    const a = data[i], b = data[i + 1];
    if (input >= a.angle && input <= b.angle) {
      const ratio = (input - a.angle) / (b.angle - a.angle);
      return +(a[key] + ratio * (b[key] - a[key])).toFixed(2);
    }
  }
};

const getAlpha = (cohesion) => {
  if (cohesion <= 40) return 1;
  if (cohesion >= 180) return 0.25;
  const range = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
  const values = [1, 0.9, 0.75, 0.62, 0.55, 0.5, 0.45, 0.4, 0.35, 0.32, 0.3, 0.28, 0.27, 0.25, 0.25];
  for (let i = 0; i < range.length - 1; i++) {
    if (cohesion >= range[i] && cohesion <= range[i + 1]) {
      const ratio = (cohesion - range[i]) / (range[i + 1] - range[i]);
      return +(values[i] + ratio * (values[i + 1] - values[i])).toFixed(2);
    }
  }
  return 0.25;
};

export default function PileCalculator() {
  const [pile, setPile] = useState({ diameter: '', length: '', capThickness: '', criticalDepth: '', factor: 15 });
  const [layers, setLayers] = useState([]);
  const [maxOverburden, setMaxOverburden] = useState(0);

  const handlePileChange = (e) => {
    const { name, value } = e.target;
    const val = parseFloat(value);
    const newPile = { ...pile, [name]: value };
    if (name === 'diameter') newPile.criticalDepth = pile.factor * val;
    if (name === 'factor') newPile.criticalDepth = pile.diameter * val;
    setPile(newPile);
  };

  const addLayer = () => {
    setLayers([
      ...layers,
      {
        soil: '', thickness: '', unitWeight: '', phi: '', cohesion: '',
        Nq: 0, Ng: 0, Ki: 0, alpha: 0, Asi: 0, Pd: 0, Pdi: 0,
        skinFriction: null, endBearing: null
      }
    ]);
  };

  const updateLayer = (index, field, value) => {
    const updated = [...layers];
    updated[index][field] = value;

    const phi = parseFloat(updated[index].phi);
    const cohesion = parseFloat(updated[index].cohesion);
    const thickness = parseFloat(updated[index].thickness);
    // const gamma = parseFloat(updated[index].unitWeight);

    if (phi) {
      updated[index].Nq = interpolate(phi, angleData, 'Nq');
      updated[index].Ng = interpolate(phi, angleData, 'Ng');
      updated[index].Ki = +(1 + ((phi - 30) / 10) * 0.5).toFixed(2);
    }

    if (cohesion) {
      updated[index].alpha = getAlpha(cohesion);
    }

    if (thickness) {
      updated[index].Asi = +(Math.PI * pile.diameter * thickness).toFixed(2);
    }

    // Pd and Pdi updates
    let depth = 0, maxPd = 0;
    for (let i = 0; i < updated.length; i++) {
      const γ = parseFloat(updated[i].unitWeight || 0);
      const h = parseFloat(updated[i].thickness || 0);
      if (depth + h <= pile.criticalDepth) {
        maxPd += (γ - 10) * h;
        depth += h;
      } else {
        const rem = pile.criticalDepth - depth;
        if (rem > 0) {
          maxPd += (γ - 10) * rem;
        }
        break;
      }
    }
    setMaxOverburden(+maxPd.toFixed(2));

    // Pd per layer
    let cumDepth = 0;
for (let i = 0; i < updated.length; i++) {
  const γ = parseFloat(updated[i].unitWeight || 0);
  const h = parseFloat(updated[i].thickness || 0);

  if (i === 0) {
    const adjustedDepth = Math.max(0, cumDepth + h - parseFloat(pile.capThickness || 0));
    updated[i].Pd = Math.min((γ - 10) * adjustedDepth, maxPd).toFixed(2);
    cumDepth += h;
  } else {
    cumDepth += h;
    const Pd = (γ - 10) * cumDepth;
    updated[i].Pd = Pd > maxPd ? maxPd : +Pd.toFixed(2);
  }
}


    // Pdi per layer
    let sumDepth = 0;
for (let i = 0; i < updated.length; i++) {
  const γ = parseFloat(updated[i].unitWeight || 0);
  const h = parseFloat(updated[i].thickness || 0);

  if (i === 0) {
    const midDepth = sumDepth + h / 2 - parseFloat(pile.capThickness || 0);
    const adjustedMid = Math.max(0, midDepth);
    updated[i].Pdi = Math.min((γ - 10) * adjustedMid, maxPd).toFixed(2);
    sumDepth += h;
  } else {
    const midDepth = sumDepth + h / 2;
    const Pdi = (γ - 10) * midDepth;
    updated[i].Pdi = Pdi > maxPd ? maxPd : +Pdi.toFixed(2);
    sumDepth += h;
  }
}


    setLayers(updated);
  };

  const handleLayerChange = (index, key, value) => {
    updateLayer(index, key, value);
  };

  const calculateEndBearing = (index) => {
    const l = layers[index];
    const D = parseFloat(pile.diameter);
    const Ap = Math.PI * D * D / 4;
    const Pd = l.Pd;
    const Cp = parseFloat(l.cohesion);
    const Nc = 9;
    const result = Ap * ((0.5 * D * l.unitWeight * l.Ng) + (Pd * l.Nq) + (Nc * Cp));
    const updated = [...layers];
    updated[index].endBearing = +result.toFixed(2);
    setLayers(updated);
  };

  const calculateSkinFriction = (index) => {
    let total = 0;
    const updated = [...layers];
    for (let i = 0; i <= index; i++) {
      const l = updated[i];
      const Ki = l.Ki;
      const Pdi = l.Pdi;
      const delta = Math.atan((l.phi * Math.PI) / 180);
      const α = l.alpha;
      const Ci = l.cohesion;
      const Asi = l.Asi;
      const part = Ki * Pdi * Math.tan(delta) * Asi + α * Ci * Asi;
      total += part;
    }
    updated[index].skinFriction = +total.toFixed(2);
    setLayers(updated);
  };

  return (
  <>
    <Navbar />
    <Container>
      <Title>Pile Foundation Capacity</Title>

      <FormGroup>
        <label>Diameter (m): <input name="diameter" type="number" value={pile.diameter} onChange={handlePileChange} /></label>
        <label>Length (m): <input name="length" type="number" value={pile.length} onChange={handlePileChange} /></label>
        <label>Cap Thickness (m): <input name="capThickness" type="number" value={pile.capThickness} onChange={handlePileChange} /></label>
        <label>Critical Depth Factor:
          <select name="factor" value={pile.factor} onChange={handlePileChange}>
            {[15, 16, 17, 18, 19, 20].map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </label>
        <label>Critical Depth: <input value={pile.criticalDepth} readOnly /></label>
      </FormGroup>

      <h3>Soil Layers</h3>
      <AddLayerButton onClick={addLayer}>Add Layer</AddLayerButton>

    {layers.map((layer, index) => {
      const Ap = (Math.PI / 4 * pile.diameter * pile.diameter).toFixed(4);
      const delta = layer.phi ? Math.atan(layer.phi * Math.PI / 180).toFixed(4) : 0;

      return (
        <LayerContainer key={index}>
          <LayerTitle>Layer {index + 1}</LayerTitle>
          <label>Soil Type:
            <select value={layer.soil} onChange={e => handleLayerChange(index, 'soil', e.target.value)}>
              <option value="">Select</option>
              {soilTypes.map(t => <option key={t}>{t}</option>)}
            </select>
          </label><br />
          <label>Thickness (m): <input type="number" value={layer.thickness} onChange={e => handleLayerChange(index, 'thickness', e.target.value)} /></label><br />
          <label>γ (kN/m³): <input type="number" value={layer.unitWeight} onChange={e => handleLayerChange(index, 'unitWeight', e.target.value)} /></label><br />
          <label>ϕ (°): <input type="number" value={layer.phi} onChange={e => handleLayerChange(index, 'phi', e.target.value)} /></label><br />
          <label>C (kN/m²): <input type="number" value={layer.cohesion} onChange={e => handleLayerChange(index, 'cohesion', e.target.value)} /></label><br />
          
          <Info>Asi: {layer.Asi} | Nq: {layer.Nq} | Nγ: {layer.Ng} | Ki: {layer.Ki} | α: {layer.alpha}</Info>
          <Info>Pd: {layer.Pd} | Pdi: {layer.Pdi}</Info>
          <Button onClick={() => calculateEndBearing(index)}>Calculate End Bearing</Button>
          <Button onClick={() => calculateSkinFriction(index)}>Calculate Skin Friction</Button>

          {layer.endBearing !== null && (
            <CalculationResult type="bearing">
              <h4>End Bearing: {layer.endBearing} kN</h4>
              <h5>Recommended End Bearing: {(layer.endBearing / 2.5).toFixed(2)} kN</h5>
              <p>Ap = {Ap} m² | Pd = {layer.Pd} | Nq = {layer.Nq} | Nγ = {layer.Ng} | C = {layer.cohesion}</p>
            </CalculationResult>
          )}
          {layer.skinFriction !== null && (
            <CalculationResult type="skin">
              <h4>Skin Friction: {layer.skinFriction} kN</h4>
              <h5>Recommended Skin Friction: {(layer.skinFriction/2.5).toFixed(2)} kN</h5>
              <p>δ = {delta} rad | Asi = {layer.Asi} | Ki = {layer.Ki} | Pdi = {layer.Pdi} | α = {layer.alpha}</p>
            </CalculationResult>
          )}
        </LayerContainer>
      );
    })}

    {maxOverburden > 0 && (
      <MaxOverburdenBox>
        <h3>Max Overburden Pressure (Pd<sub>max</sub>)</h3>
        <p>
          Pd<sub>max</sub> = <strong>{maxOverburden} kN/m²</strong> (calculated up to critical depth)
        </p>
      </MaxOverburdenBox>
    )}
  </Container>
  </>
);

}
