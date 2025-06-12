import CategorieOverview from '../categorieen/CategorieenOverview';
import CategorieUitgavenGraph from '../categorieen/CategorieUitgavenGraph';
import InkomenOverview from '../inkomen/InkomenOverview';
import InkomstenUitgavenGraph from '../inkomen/InkomstenUitgavenGraph';
import OverigSaldo from '../overig/OverigSaldo';
import UitgavenOverview from '../uitgaven/UitgavenOverview';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Huishoudboekje } from '../../models/Huishoudboekje';

interface DetailGridParameters {
  huishoudboekje: Huishoudboekje;
  maand: number;
  isOwner: boolean;
  onDragEnd: (event: any) => void;
}

export const DetailGrid: React.FC<DetailGridParameters> = ({ huishoudboekje, maand, isOwner, onDragEnd }) => 
{
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="row">
        <div className="graph">
          <CategorieUitgavenGraph huishoudboekjeId={huishoudboekje.id} />
        </div>
        <div className="grid">
          <CategorieOverview huishoudboekjeId={huishoudboekje.id} />
        </div>
      </div>
      <div className="row">
        <div className="graph">
          <InkomstenUitgavenGraph huishoudboekjeId={huishoudboekje.id} maand={maand} />
        </div>
        <div className="grid">
          <InkomenOverview huishoudboekjeId={huishoudboekje.id} maand={maand} isOwner={isOwner} />
        </div>
      </div>
      <div className="row">
        <div className="graph">
          <OverigSaldo huishoudboekjeId={huishoudboekje.id} maand={maand} />
        </div>
        <div className="grid">
          <UitgavenOverview huishoudboekjeId={huishoudboekje.id} maand={maand} isOwner={isOwner} />
        </div>
      </div>
    </DndContext>
  );
};
