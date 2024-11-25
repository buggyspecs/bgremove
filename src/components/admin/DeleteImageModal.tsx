import { Dialog } from '@headlessui/react';
import { Image } from '../../types';
import { useImageStore } from '../../lib/store';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

interface DeleteImageModalProps {
  image: Image;
  onClose: () => void;
}

export default function DeleteImageModal({ image, onClose }: DeleteImageModalProps) {
  const deleteImage = useImageStore((state) => state.deleteImage);

  const handleDelete = () => {
    deleteImage(image.id);
    toast.success('Image deleted successfully!');
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
          
          <Dialog.Title className="text-lg font-medium text-center text-gray-900 mb-4">
            Delete Image
          </Dialog.Title>

          <p className="text-sm text-gray-500 text-center mb-6">
            Are you sure you want to delete "{image.title}"? This action cannot be undone.
          </p>

          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}