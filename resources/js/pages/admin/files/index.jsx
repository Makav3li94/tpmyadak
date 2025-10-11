import { router, Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/layouts/default/authenticated-layout'
import {
    Card,
    Button,
} from '@/components/index'
import React, {useRef, useState} from "react";
import {
    Folder,
    FolderPlus,
    Trash2,
    UploadCloud,
    ChevronRight,
    FileText,
    FileImage,
    FileArchive,
    FileAudio,
    FileVideo,
    File,
    Download,
    X,
    FolderRoot,
} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {toast} from "sonner";
function buildFolderTree(flat) {
    const map = new Map();
    const roots = [];

    flat.forEach(folder => {
        map.set(folder.id, { ...folder, children: [] });
    });

    flat.forEach(folder => {
        if (folder.parent_id) {
            const parent = map.get(folder.parent_id);
            if (parent) {
                parent.children.push(map.get(folder.id));
            }
        } else {
            roots.push(map.get(folder.id));
        }
    });

    return roots;
}

function getFileIcon(mime) {
    if (mime.startsWith('image/')) return <FileImage className="w-5 h-5 text-blue-500" />;
    if (mime.startsWith('video/')) return <FileVideo className="w-5 h-5 text-purple-500" />;
    if (mime.startsWith('audio/')) return <FileAudio className="w-5 h-5 text-pink-500" />;
    if (mime.includes('zip') || mime.includes('rar') || mime.includes('tar') || mime.includes('7z'))
        return <FileArchive className="w-5 h-5 text-yellow-500" />;
    if (mime.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (mime.includes('text') || mime.includes('csv') || mime.includes('json'))
        return <FileText className="w-5 h-5 text-green-500" />;
    if (mime.includes('word')) return <FileText className="w-5 h-5 text-blue-600" />;
    if (mime.includes('excel') || mime.includes('sheet'))
        return <FileText className="w-5 h-5 text-green-600" />;
    if (mime.includes('powerpoint') || mime.includes('presentation'))
        return <FileText className="w-5 h-5 text-orange-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
}

function isPreviewable(mime) {
    return (
        mime.startsWith('image/') ||
        mime.startsWith('text/') ||
        mime.includes('pdf') ||
        mime.includes('document')
    );
}
export default function Index({folders,currentFolderId,currentFolder,files}) {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [deleteFolderId, setDeleteFolderId] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);

    const confirmDeleteFolder = () => {
        if (!deleteFolderId) return;

        const deletingCurrent = deleteFolderId === currentFolderId;

        router.delete(`/media/${deleteFolderId}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Folder deleted successfully');
                setDeleteFolderId(null);

                if (deletingCurrent) {
                    router.visit('/files', { replace: true });
                } else {
                    router.reload({ only: ['folders'] });
                }
            },
            onError: () => toast.error('Failed to delete folder'),
        });
    };

    const handleUpload = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        if (currentFolderId) formData.append('folder_id', currentFolderId.toString());

        setUploading(true);
        router.post('/files', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('File uploaded successfully');
                if (fileInputRef.current) fileInputRef.current.value = '';
                router.reload({ only: ['files'] });
            },
            onError: () => toast.error('Failed to upload file'),
            onFinish: () => setUploading(false),
        });
    };

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) {
            toast.error('Folder name cannot be empty');
            return;
        }

        setIsCreatingFolder(true);
        router.post('/media', {
            name: newFolderName,
            parent_id: currentFolderId,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Folder created successfully');
                setNewFolderName('');
                setIsCreatingFolder(false);
                router.reload({ only: ['folders'] });
            },
            onError: () => {
                toast.error('Failed to create folder');
                setIsCreatingFolder(false);
            },
        });
    };
    const renderFolderTree = (nodes, level = 0) => {
        return nodes.map((folder) => (
            <div key={folder.id} style={{ marginLeft: level * 12 }} className="mb-1">
                <div
                    className={`flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded ${currentFolderId === folder.id ? 'bg-gray-100' : ''}`}
                    onClick={() => router.visit(`/files?folder_id=${folder.id}`)}
                >
                    {folder.children.length > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                    {folder.children.length === 0 && (
                        <span className="w-4 h-4"></span>
                    )}

                    <Folder className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm truncate flex-1">{folder.name}</span>

                    {/*DELETE FOLDER*/}

                    {/*<AlertDialog>*/}
                    {/*    <AlertDialogTrigger asChild>*/}
                    {/*        <Button*/}
                    {/*            variant="ghost"*/}
                    {/*            size="icon"*/}
                    {/*            className="h-6 w-6 text-gray-500 hover:text-red-500"*/}
                    {/*            onClick={(e) => {*/}
                    {/*                e.stopPropagation();*/}
                    {/*                setDeleteFolderId(folder.id);*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <Trash2 className="w-3 h-3" />*/}
                    {/*        </Button>*/}
                    {/*    </AlertDialogTrigger>*/}
                    {/*    <AlertDialogContent>*/}
                    {/*        <AlertDialogHeader>*/}
                    {/*            <AlertDialogTitle>Delete Folder?</AlertDialogTitle>*/}
                    {/*            <AlertDialogDescription>*/}
                    {/*                Folder <strong>{folder.name}</strong> and all its contents will be permanently deleted.*/}
                    {/*            </AlertDialogDescription>*/}
                    {/*        </AlertDialogHeader>*/}
                    {/*        <AlertDialogFooter>*/}
                    {/*            <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                    {/*            <AlertDialogAction*/}
                    {/*                onClick={confirmDeleteFolder}*/}
                    {/*                className="bg-red-600 hover:bg-red-700"*/}
                    {/*            >*/}
                    {/*                Delete*/}
                    {/*            </AlertDialogAction>*/}
                    {/*        </AlertDialogFooter>*/}
                    {/*    </AlertDialogContent>*/}
                    {/*</AlertDialog>*/}
                </div>
                {folder.children.length > 0 && (
                    <div className="ml-4">
                        {renderFolderTree(folder.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };
    return (
        <AuthenticatedLayout
            title={'media'}
            breadcumbs={[
                { name: 'Dashboard', href: route('admin.dashboard') },
                { name: 'media', href: route('admin.file.index') },
            ]}
        >
            <Head title="media" />

            <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Folder Tree */}
                <div className="md:col-span-1 border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold">Folder Structure</h2>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsCreatingFolder(true)}
                            className="gap-1"
                        >
                            <FolderPlus className="w-4 h-4" />
                            <span>New Folder</span>
                        </Button>
                    </div>

                    <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                        <div
                            className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded mb-2 ${!currentFolderId ? 'bg-gray-100' : ''}`}
                            onClick={() => router.visit('/files')}
                        >
                            <FolderRoot className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">Root Folder</span>
                        </div>
                        {renderFolderTree(buildFolderTree(folders ?? []))}
                    </div>
                </div>

                {/* Main Panel File View */}
                <div className="md:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">
                                {currentFolder ? currentFolder.name : 'Root Folder'}
                            </h2>
                            {currentFolder && (
                                <span className="text-sm text-gray-500">
                  ({files.length} {files.length === 1 ? 'item' : 'items'})
                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleUpload}
                                disabled={uploading}
                                className="hidden"
                                multiple
                            />
                            <Button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="gap-2"
                            >
                                <UploadCloud className="w-4 h-4" />
                                {uploading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {files.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <Folder className="w-12 h-12 mb-2" />
                            <p>No files in this folder</p>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload the first file
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="border rounded-lg p-4 hover:border-blue-500 transition-colors group cursor-pointer"
                                    onClick={() => isPreviewable(file.mime_type) ? setPreviewFile(file) : null}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(file.mime_type)}
                                            <div className="overflow-hidden">
                                                <p className="font-medium truncate">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size}</p>
                                                <p className="text-xs text-gray-500">{file.created_at}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={file.url}
                                                download={file.name}
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-1 text-gray-500 hover:text-blue-500"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        className="p-1 text-gray-500 hover:text-red-500"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete File?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            File <strong>{file.name}</strong> will be permanently deleted.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => router.delete(`/files/${file.id}`, {
                                                                preserveScroll: true,
                                                                onSuccess: () => {
                                                                    setPreviewFile(null);
                                                                    router.reload({ only: ['files'] });
                                                                },
                                                            })}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


        </AuthenticatedLayout>
    )
}
