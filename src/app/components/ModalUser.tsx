import React, { useState, useEffect, useRef } from "react";
import { useCustomerContext, CustomerData } from "@/context/UiProvideUser"; // Asegúrate de que la ruta sea correcta
import { motion, AnimatePresence } from "framer-motion";

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

  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData({
      dniRuc: customerData?.dniRuc || "",
      nombre: customerData?.nombre || "",
      direccion: customerData?.direccion || "",
      celular: customerData?.celular || "",
    });
  }, [customerData, isOpen]);

  useEffect(() => {
    if (isOpen) {
      // focus al abrir
      setTimeout(() => firstFieldRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simular una pequeña espera para feedback
    await new Promise((r) => setTimeout(r, 450));
    setCustomerData(formData);
    setSaving(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={handleBackdropClick}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
            initial={{ y: -8, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -6, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Datos del Cliente</h2>
              <button
                onClick={onClose}
                aria-label="Cerrar modal"
                className="text-gray-500 hover:text-gray-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm mb-1 text-gray-700">DNI/RUC</label>
                <input
                  ref={firstFieldRef}
                  type="text"
                  name="dniRuc"
                  value={formData.dniRuc}
                  onChange={handleChange}
                  className="border rounded w-full p-2 focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Nombre/Razón Social</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="border rounded w-full p-2 focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="border rounded w-full p-2 focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                  required
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">Celular</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  className="border rounded w-full p-2 focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-end items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 text-gray-700"
                >
                  Cancelar
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-400 text-white rounded px-4 py-2 flex items-center"
                  aria-disabled={saving}
                >
                  {saving ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : null}
                  {saving ? "Guardando..." : "Guardar"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
