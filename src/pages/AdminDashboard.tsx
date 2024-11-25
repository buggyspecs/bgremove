import { useState } from 'react';
import { useImageStore } from '../lib/store';
import Header from '../components/Header';
import ImageTable from '../components/admin/ImageTable';
import ImageForm from '../components/admin/ImageForm';
import EditImageModal from '../components/admin/EditImageModal';
import DeleteImageModal from '../components/admin/DeleteImageModal';
import { Image } from '../types';
import { Toaster } from 'react-hot-toast';
import { Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [deletingImage, setDeletingImage] = useState<Image | null>(null);
  const { images } = useImageStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Image Management</h1>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Image
            </button>
          </div>

          <ImageTable
            images={images}
            onEdit={setEditingImage}
            onDelete={setDeletingImage}
          />

          {showCreateForm && (
            <ImageForm
              onClose={() => setShowCreateForm(false)}
              mode="create"
            />
          )}

          {editingImage && (
            <EditImageModal
              image={editingImage}
              onClose={() => setEditingImage(null)}
            />
          )}

          {deletingImage && (
            <DeleteImageModal
              image={deletingImage}
              onClose={() => setDeletingImage(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}