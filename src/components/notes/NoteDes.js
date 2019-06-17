import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import './markdown.less'

const renderer = new marked.Renderer()
marked.setOptions({
	renderer,
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	highlight: function (code) {
		return hljs.highlightAuto(code).value;
	}
});

function DIYMarked(text) {
	const result = text
		.replace(/C\(N\)/g, '<span class="marked-checkBox"></span>')
		.replace(/C\(Y\)/g, '<span class="marked-checkBox"><i class="iconfont icon-gou1"></i></span>')
	return result
}


class NoteDes extends React.Component{
	constructor(props) {
		super(props)
	}
	render() {
		const MarkdownResult = {
			__html: DIYMarked(marked(this.props.curNote.content))
		}
		return (
			<div className="markdown-style" >
				<div dangerouslySetInnerHTML={MarkdownResult}></div>
			</div>
			
		)
	}
}

export default NoteDes
