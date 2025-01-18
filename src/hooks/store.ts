import { create } from 'zustand'

type DocStoreProps = {
	docName: string
	setDocName: (name: string) => void
}
const docStore = create<DocStoreProps>((set) => ({
	docName: 'Untitled Document',
	setDocName: (name) => set({ docName: name }),
}))

export { docStore }
