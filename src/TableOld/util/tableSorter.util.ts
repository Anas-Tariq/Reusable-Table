// sorting functions for different data types
export default function tableSorter (type: string)  {
    switch (type) {
      case 'string':
        return (a: any, b: any) => (a ?? '').localeCompare(b ?? '');
      case 'link':
        return (a: any, b: any) => (a ?? '').localeCompare(b ?? '');
      case 'integer':
        return (a: any, b: any) => Number(a) - Number(b);
      case 'float':
        return (a: any, b: any) => parseFloat(a) - parseFloat(b);
      case 'date':
        return (a: any, b: any) => new Date(a).getTime() - new Date(b).getTime();
      default:
        return undefined;
    }
  };
  