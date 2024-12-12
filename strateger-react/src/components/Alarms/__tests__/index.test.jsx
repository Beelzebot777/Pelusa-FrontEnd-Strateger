// Importar los módulos desde el index.js
import { Alarms, AlarmTable, AlarmFiltersPanelContainer } from '../../../components/Alarms/index';

describe('Alarms index.js exports', () => {
  
  it('should export Alarms component', () => {
    expect(Alarms).toBeDefined();
  });

  it('should export AlarmTable component', () => {
    expect(AlarmTable).toBeDefined();
  });

  it('should export AlarmFiltersPanelContainer component', () => {
    expect(AlarmFiltersPanelContainer).toBeDefined();
  });

});