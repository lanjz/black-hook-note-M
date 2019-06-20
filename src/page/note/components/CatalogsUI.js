import React from 'react'
import constKey from '../../../utils/const.js'

function TreeItem(props) {
	const { actCatalog, curNode, chooseCatalog, catalogs, treeChainList = []} = props
	return (
		<div className="catalogs-layout">
			<div
				className={actCatalog === curNode['_id'] ?
					"flex align-items-center catalogs-item-layout act" : 'flex align-items-center catalogs-item-layout'}
				onClick={chooseCatalog.bind(this, curNode)}
			>
				{curNode.icon ? <i className={"iconfont " + curNode.icon}></i> :
					treeChainList&&treeChainList.indexOf(curNode['_id']) > -1 ?
						<i className="iconfont icon-wenjianjia"></i> :
						<i className="iconfont icon-wendang1"></i>
				}
				
				<div className="catalogs-name line-ellipsis">{curNode.name}</div>
			</div>
			{(curNode.hasChild && catalogs[curNode['_id']]&&catalogs[curNode['_id']].childNodes.length) ?
			catalogs[curNode['_id']].childNodes.map((item, index) => (
				<TreeItem {...props} curNode={item} key={index}></TreeItem>
			)) : null
			}
		</div>
	)
}

class CatalogUI extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			catalogList: [
				{  _id: constKey.recentlyArticlesKey, name: '最近文档', hasChild: false, icon: 'icon-wendang' },
				{ _id: props.books.curBook+'_root', name: '我的文件夹', hasChild: true },
			],
			treeChainList: []
		}
	}
	componentDidMount() {
		this.props.CATALOGS_GET()
			.then(res => {
				if(!res.err) {
					this.setCatalogsChainList()
				}
				
			})
	
	}
	setCatalogsChainList() {
		const { catalogs } = this.props
		const chain = []
		chain.push(catalogs.curCatalog)
		let curId = catalogs.curCatalog
		while (catalogs.list&&catalogs.list[curId]&&catalogs.list[curId].parentId) {
			curId = catalogs.list[curId].parentId
			chain.push(curId)
		}
		this.setState({
			treeChainList: chain
		})
	}
	chooseCatalog = (item) => {
		this.props.gotoNote(item)
	}
	render() {
		const { books, catalogs } = this.props
		return (
			<div className="layout-padding note-brief-layout">
				{this.state.catalogList.map((item, index) => (
					<TreeItem
						curNode={item}
						key={index}
						chooseCatalog={this.chooseCatalog}
						actCatalog={catalogs.curCatalog}
						catalogs={catalogs.list}
						treeChainList={this.state.treeChainList}
					></TreeItem>
				))}
			</div>
		)
	}
}

export default CatalogUI
