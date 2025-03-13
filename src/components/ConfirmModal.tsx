export default function ConfirmModal({
  setShowDeleteConfirm,
  confirmDelete,
}: {
  setShowDeleteConfirm: (show: boolean) => void;
  confirmDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-background-light rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">
          Delete Note
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this note?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 hover:bg-primary-light rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-primary-light text-primary rounded-lg hover:bg-primary-light transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
