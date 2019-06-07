import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { BlogPostNodeWidget } from "./BlogPostNodeWidget";
import { BlogPostNodeModel } from "./BlogPostNodeModel";

export class BlogPostNodeFactory extends SRD.AbstractNodeFactory {
	constructor() {
		super("BlogPost");
	}

	generateReactWidget(diagramEngine, node) {
		return <BlogPostNodeWidget node={node} />;
	}

	getNewInstance() {
		return new BlogPostNodeModel();
	}
}

