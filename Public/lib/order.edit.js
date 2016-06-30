//var React = require('react');
//var ReactDOM = require('react-dom');

var OrderDetailContainer = React.createClass({
	displayName: "OrderDetailContainer",

	onDelClick: function (e) {
		var key = e.target.getAttribute("data-key");
		this.props.onOrderDetailDelClick(key);
	},

	render: function () {
		var orderGoodsNode = this.props.orderGoods.map(function (goods) {
			var flagNode = goods.flag.map(function (flag) {
				if (flag.checked) {
					return React.createElement(
						"small",
						{ key: flag.key, className: "btn btn-tiny btn-warning" },
						flag.value
					);
				}
			});
			return React.createElement(
				"div",
				{ className: "row order-goods-detail", key: goods.key },
				React.createElement(
					"div",
					{ className: "col-md-4" },
					goods.goods_name
				),
				React.createElement(
					"div",
					{ className: "col-md-2" },
					"1"
				),
				React.createElement(
					"div",
					{ className: "col-md-3" },
					goods.price
				),
				React.createElement(
					"div",
					{ className: "col-md-3" },
					goods.price * goods.number
				),
				React.createElement(
					"div",
					{ className: "col-md-12 text-right" },
					flagNode
				),
				React.createElement("span", { "data-key": goods.key, onClick: this.onDelClick, className: "remove-btn text-danger glyphicon glyphicon-remove" })
			);
		}.bind(this));
		return React.createElement(
			"div",
			{ className: "col-md-4" },
			React.createElement(
				"div",
				{ className: "panel panel-default" },
				React.createElement(
					"div",
					{ className: "panel-heading" },
					"订单明细"
				),
				React.createElement(
					"div",
					{ className: "panel-body", id: "order-detail-container" },
					orderGoodsNode,
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-12 text-right" },
							"合计:32.00"
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"button",
							{ className: "btn btn-success" },
							"结账出单"
						)
					)
				)
			)
		);
	}
});

var GoodsContainer = React.createClass({
	displayName: "GoodsContainer",

	render: function () {
		return React.createElement(
			"div",
			{ className: "col-md-8" },
			React.createElement(CategoryList, { category: this.props.category, onCategoryClick: this.props.onCategoryClick }),
			React.createElement(FlagList, { flag: this.props.flag, onFlagClick: this.props.onFlagClick }),
			React.createElement(GoodsList, { goods: this.props.goods, filterCategory: this.props.filterCategory, onGoodsClick: this.props.onGoodsClick })
		);
	}
});

var CategoryList = React.createClass({
	displayName: "CategoryList",

	onClick: function (e) {
		var category_id = e.target.getAttribute("data-id");
		this.props.onCategoryClick(category_id);
	},

	render: function () {
		var categoryNode = this.props.category.map(function (category) {
			return React.createElement(
				"span",
				{ onClick: this.onClick, className: "btn btn-lg btn-success", "data-id": category.id, key: category.id },
				category.category_name
			);
		}.bind(this));

		return React.createElement(
			"div",
			{ className: "col-md-12", id: "category-list" },
			React.createElement(
				"span",
				{ className: "btn btn-lg btn-danger" },
				"最热"
			),
			React.createElement(
				"span",
				{ className: "btn btn-lg btn-danger" },
				"推荐"
			),
			categoryNode
		);
	}
});

var FlagList = React.createClass({
	displayName: "FlagList",

	onClick: function (e) {
		var nodeName = e.target.nodeName;
		var divNode = e.target;
		if (nodeName == "SPAN") {
			divNode = e.target.parentNode;
		}
		var key = divNode.getAttribute("data-key");
		this.props.onFlagClick(key);
	},

	render: function () {
		var flagNode = this.props.flag.map(function (flag) {
			var spanStyle = flag.checked ? { display: "inline" } : { display: "none" };
			return React.createElement(
				"div",
				{ className: "btn btn-sm btn-warning", "data-key": flag.key, key: flag.key, onClick: this.onClick },
				React.createElement(
					"span",
					null,
					flag.value
				),
				React.createElement("span", { style: spanStyle, className: "text-success glyphicon glyphicon-ok" })
			);
		}.bind(this));
		return React.createElement(
			"div",
			{ className: "col-md-12 block", id: "flag-list" },
			flagNode
		);
	}
});

var GoodsList = React.createClass({
	displayName: "GoodsList",

	onClick: function (e) {
		var nodeName = e.target.nodeName;
		var divNode = e.target;
		if (nodeName == "SPAN") {
			divNode = e.target.parentNode;
		}
		var goods_id = divNode.getAttribute("data-id");
		var time = new Date().getTime();
		this.props.onGoodsClick(goods_id, time);
	},

	render: function () {
		var goodsNodes = this.props.goods.map(function (goods) {
			var filterCategory = this.props.filterCategory;
			//console.log(filterCategory);
			if (filterCategory != 0 && filterCategory != goods.category_id) {
				return;
			}
			var divStyle = { backgroundImage: "url(" + goods.logo + ")" };
			return React.createElement(
				"div",
				{ style: divStyle, onClick: this.onClick, className: "goods-detail btn btn-default", "data-id": goods.id, key: goods.id },
				React.createElement(
					"span",
					null,
					goods.goods_name
				)
			);
		}.bind(this));
		return React.createElement(
			"div",
			{ className: "col-md-12 block", id: "goods-list" },
			goodsNodes
		);
	}
});

var OrderBox = React.createClass({
	displayName: "OrderBox",

	getInitialState: function () {
		return {
			goods: [],
			category: [],
			filterCategory: 0,
			orderGoods: [],
			flag: [{ key: 1, value: "常温", checked: false }, { key: 2, value: "加冰", checked: false }, { key: 3, value: "加热", checked: false }]
		};
	},
	componentDidMount: function () {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			cache: false,
			success: function (data) {
				this.setState({ goods: data.goods });
				this.setState({ category: data.category });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString);
			}.bind(this)
		});
	},

	handleCategoryClick: function (category_id) {
		this.setState({ filterCategory: category_id });
	},

	handleGoodsClick: function (goods_id, key) {
		var orderGoods = this.state.orderGoods;
		var goodsClick = this.state.goods.find(function (value, index, arr) {
			return value.id == goods_id;
		});
		var time = new Date().getTime();
		var flag = this.state.flag.filter(function (flag) {
			return flag.checked === true;
		});
		var flagNew = flag.map(function (flag) {
			return { key: flag.key, value: flag.value, checked: flag.checked };
		});
		var orderGoodsNew = {
			key: time,
			id: goodsClick.id,
			goods_name: goodsClick.goods_name,
			barcode: goodsClick.barcode,
			plucode: goodsClick.plucode,
			category_id: goodsClick.category_id,
			category_name: goodsClick.category_name,
			price: goodsClick.price,
			unit: goodsClick.unit,
			number: 1,
			flag: flagNew
		};
		this.setState({ orderGoods: orderGoods.concat(orderGoodsNew) });
		//将flag还原为初始状态
		this.state.flag.forEach(function (flag) {
			flag.checked = false;
		});
	},

	handleFlagClick: function (key) {
		var flag = this.state.flag;
		var flagClick = flag.find(function (value, index, arr) {
			return value.key == key;
		});
		flagClick.checked = !flagClick.checked;
		this.setState({ flag: flag });
	},

	handleOrderDetailDelClick: function (key) {
		var orderGoods = this.state.orderGoods;
		var goodsClickKey = orderGoods.findIndex(function (value, index, arr) {
			return value.key == key;
		});
		orderGoods.splice(goodsClickKey, 1);
		this.setState({ orderGoods: orderGoods });
	},

	render: function () {
		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(OrderDetailContainer, { orderGoods: this.state.orderGoods, onOrderDetailDelClick: this.handleOrderDetailDelClick }),
			React.createElement(GoodsContainer, { onFlagClick: this.handleFlagClick, onGoodsClick: this.handleGoodsClick, onCategoryClick: this.handleCategoryClick, goods: this.state.goods, category: this.state.category, filterCategory: this.state.filterCategory, flag: this.state.flag })
		);
	}
});

ReactDOM.render(React.createElement(OrderBox, { url: "/index.php/Admin/Goods/getGoods" }), document.getElementById('order-edit-form'));