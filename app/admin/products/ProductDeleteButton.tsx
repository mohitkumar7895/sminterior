'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function ProductDeleteButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete product.');
      }
    } catch (e) {
      alert('Error deleting product.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 hover:text-red-200 transition-colors inline-block"
      title="Delete product"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}

