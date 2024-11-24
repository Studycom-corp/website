import { defineStore } from "pinia";
import { useErrorHandle } from "./error_handle";
import { api } from "@/router/api";

export const useLibraryStore = defineStore('library', {
    state() {
        let loadedLibrary: Library | undefined;
        let loadedFolder: Folder | undefined
        let files: AppFile[] = [
            {
                updatedAt: "21:34", createdAt: "21:34", id: "Ksjwih3ow0",
                name: "Sales persons", size: "23 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "cwoef990dk",
                name: "Let's connect", size: "0.9 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "nciwh20df",
                name: "Superset calculations", size: "2.3 MB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "mskcnvei93",
                name: "Linear algebra", size: "410 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
            {
                updatedAt: "21:34", createdAt: "21:34", id: "slwo8o4)u",
                name: "Near the cross", size: "124 KB", folder: "uw3g83ihn",
                owner: "ainedixon01@gmail.com"
            },
        ]
        let activeFilter: string | undefined
        let creationState: {status: boolean, source: string} = {status: false, source: ''}
        let libraries: Library[] = [
            {
                id: "dnw80234u98", name: "Assembly language",
                owner: "Aine Dickson", createdAt: "23:23",
                updatedAt: "23:23",
                audience: 'private',
                folders: [
                    {
                        id: "uw3g83ihn",
                        createdAt: "23:40",
                        updatedAt: "23:40",
                        name: "Physics",
                        audience: 'private',
                        library: "dnw80234u98",
                        numberOfFiles: 5
                    },
                    {
                        id: "iNA8729JD",
                        createdAt: "23:40",
                        updatedAt: "23:40",
                        name: "Biology",
                        library: "dnw80234u98",
                        audience: 'private',
                        numberOfFiles: 0
                    },
                    {
                        id: "SIewujw9",
                        createdAt: "23:40",
                        updatedAt: "23:40",
                        name: "Math",
                        library: "dnw80234u98",
                        audience: 'private',
                        numberOfFiles: 0
                    },
                    {
                        id: "Sdkwbics39",
                        createdAt: "23:40",
                        updatedAt: "23:40",
                        name: "Chemistry",
                        library: "dnw80234u98",
                        audience: 'private',
                        numberOfFiles: 0
                    },
                    {
                        id: "lnwfei383",
                        createdAt: "23:40",
                        updatedAt: "23:40",
                        name: "Economics",
                        library: "dnw80234u98",
                        audience: 'private',
                        numberOfFiles: 0
                    },
                    
                ]
            },
            {
                id: "kdbi7ew234", name: "Low level systems",
                owner: "Aine Dickson", createdAt: "23:23",
                updatedAt: "23:23",
                audience: 'private',
                folders: []
            },
        ]

        return { loadedLibrary, libraries, activeFilter, loadedFolder, creationState, files }
    },

    actions: {
        loadLibrary(libId: string) {
            const libIndex = this.libraries.findIndex(lib => lib.id == libId)

            if (libIndex == undefined) {
                const errorHandler = useErrorHandle()
                errorHandler.alertError("Error while loading library, refresh page & try again")
                return
            }

            this.loadedLibrary = this.libraries[libIndex]
        },

        unloadLibrary() {
            this.loadedLibrary = undefined
        },

        loadFolder(folderId: string) {
            const folderIndex = this.loadedLibrary?.folders.findIndex(folder => folder.id == folderId)

            if (folderIndex == undefined) {
                const errorHandler = useErrorHandle()
                errorHandler.alertError("Error while loading folder content, refresh page & try again")
                return
            }

            this.loadedFolder = this.loadedLibrary?.folders[folderIndex]
        },

        switchCreationState(status: boolean, source: string) {
            this.creationState = {status, source}
        },

        unloadFolder() {
            this.loadedFolder = undefined
        },

        selectFilterTab(filterName: string) {
            this.activeFilter = filterName
        },

        async createLibrary(library: RawLibrary) {
            const errorHandler = useErrorHandle()
            try {
                const response = await api.post("/libraries/create", library)
                
                if (response.status == 210) {
                    this.libraries.push(response.data)
                }
            } catch (error) {
                console.log(error)
                errorHandler.alertError(error)
            }
        },

        async createFolder(folder: RawFolder) {
            // TODO: Create folder implementation
        },

        async uploadeFile(file: RawFile) {
            // TODo: 
        }
    },
    persist: true
})

export interface RawLibrary {
    owner: string,
    name: string,
    audience: 'public' | 'private'
}

export interface Library extends RawLibrary {
    id: string,
    createdAt: string,
    updatedAt: string,
    folders: Folder[]
}

export interface RawFolder {
    name: string,
    audience: 'private' | 'public',
    library: string,
    numberOfFiles: number
}

export interface Folder extends RawFolder {
    id: string,
    createdAt: string,
    updatedAt: string
}

export interface RawFile {
    id: string,
    name: string,
    size: string,
    folder: string,
    owner: string
}

export interface AppFile extends RawFile {
    createdAt: string,
    updatedAt: string
}