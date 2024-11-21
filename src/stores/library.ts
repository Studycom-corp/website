import { defineStore } from "pinia";
import { useErrorHandle } from "./error_handle";
import { api } from "@/router/api";

export const useLibraryStore = defineStore('library', {
    state() {
        let loadedLibrary: Library | undefined;
        let activeFilter: string | undefined
        let libraries: Library[] = [
            {
                id: "dnw80234u98", name: "Assembly language",
                owner: "Aine Dickson", createdAt: "23:23",
                updatedAt: "23:23",
                folders: [
                    {
                        id: "uw3g83ihn",
                        createdAt: "23:40",
                        updatedAt: "23:40",
                        name: "Physics",
                        files: []
                    }
                ]
            },
            {
                id: "kdbi7ew234", name: "Low level systems",
                owner: "Aine Dickson", createdAt: "23:23",
                updatedAt: "23:23",
                folders: []
            },
        ]

        return { loadedLibrary, libraries, activeFilter }
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
        }
    },
    persist: true
})

export interface RawLibrary {
    owner: string,
    name: string
}

export interface Library extends RawLibrary {
    id: string,
    createdAt: string,
    updatedAt: string,
    folders: Folder[]
}

export interface RawFolder {
    name: string,
    files: []
}

export interface Folder extends RawFolder {
    id: string,
    createdAt: string,
    updatedAt: string
}