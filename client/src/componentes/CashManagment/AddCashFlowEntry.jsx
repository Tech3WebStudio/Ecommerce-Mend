import { useState } from 'react';

const AddCashFlowEntry = ({ onAddCashFlowEntry, onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Ingreso');  // Estado para el tipo de movimiento

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!amount || amount <= 0) {
      alert("El monto debe ser mayor que 0");
      return;
    }

    // Formatear los datos de entrada
    const entry = {
      tipo: type,        // El tipo de movimiento (Ingreso o Gasto)
      monto: parseFloat(amount),   // Asegúrate de que el monto sea un número
      descripcion: description,
      fecha: date,
    };

    // Pasar la nueva entrada al padre para que dispare la acción
    onAddCashFlowEntry(entry);

    // Resetear los campos del formulario
    setDescription('');
    setAmount('');
    setDate('');
    setType('Ingreso');  // Reiniciar el tipo a "Ingreso"
    onClose();  // Cerrar el modal después de añadir la entrada
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Añadir entrada</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Monto"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input input-bordered w-full"
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Gasto">Gasto</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-400 text-white rounded-md"
            >
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCashFlowEntry;
