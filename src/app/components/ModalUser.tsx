import React, { useState } from "react";
import { useCustomerContext, CustomerData } from "@/context/UiProvideUser"; // Asegúrate de que la ruta sea correcta

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [customerData, setCustomerData] = useCustomerContext();

  const [formData, setFormData] = useState<CustomerData>({
    dniRuc: customerData?.dniRuc || "",
    nombre: customerData?.nombre || "",
    direccion: customerData?.direccion || "",
    celular: customerData?.celular || "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerData(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-96">
        <h2 className="text-lg font-semibold mb-4">Datos del Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">DNI/RUC</label>
            <input
              type="text"
              name="dniRuc"
              value={formData.dniRuc}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nombre/Razón Social</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Celular</label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="border rounded w-full p-2"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-300 rounded px-4 py-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-400 hover:bg-pink-300 text-white rounded px-4 py-2 ml-2"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
