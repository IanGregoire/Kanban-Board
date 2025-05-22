import { Form } from '@remix-run/react';

interface ProjectModalProps {
    onClose: () => void;
}

export default function ProjectModal({ onClose }: ProjectModalProps) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 space-y-4">
                <h2 className='text-lg font-semibold mb-2'>Add New Project</h2>
                <Form method="post" onSubmit={() => onClose()}>
                    <input type='hidden' name='intent' value='create-project' />
                    <input 
                        type='text' 
                        name='name' 
                        required 
                        placeholder='Project name' 
                        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none text-black'
                    />
                    <div className='flex justify-end gap-2 mt-4'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                        >
                            Add Project
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}