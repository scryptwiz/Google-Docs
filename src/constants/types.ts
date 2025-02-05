import { Preloaded } from "convex/react"
import { api } from "../../convex/_generated/api"

export type preloadedDocProps = {
	preloadedDoc: Preloaded<typeof api.documents.getDocById>
}