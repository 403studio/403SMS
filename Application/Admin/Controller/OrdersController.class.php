<?php
namespace Admin\Controller;
use Think\Controller;

class  OrdersController extends Controller {
	public $fields = array(
		array('field_name' => '', 'field' => 'id', 'listview' => false, 'editview' => true),
		array('field_name' => '商品名称', 'field' => 'goods_name', 'listview' => true, 'editview' => true, 'uiType' => 'text'),
		array('field_name' => '类别名称', 'field' => 'category_name', 'listview' => true, 'editview' => true, 'uiType' => 'category'),
		array('field_name' => '', 'field' => 'category_id', 'listview' => false, 'editview' => true, 'uiType' => 'hidden'),
		array('field_name' => '条形码', 'field' => 'barcode', 'listview' => true, 'editview' => true, 'uiType' => 'text'),
		array('field_name' => 'PLU码', 'field' => 'plucode', 'listview' => true, 'editview' => true, 'uiType' => 'text'),
		array('field_name' => '计量单位', 'field' => 'unit', 'listview' => true, 'editview' => true, 'uiType' => 'text'),
		array('field_name' => '参考单价', 'field' => 'price', 'listview' => true, 'editview' => true, 'uiType' => 'text'),
		array('field_name' => '商品LOGO', 'field' => 'logo', 'listview' => false, 'editview' => true, 'uiType' => 'text'),
	);

	public function index() {
		$controller = $this;
		$model =  M(CONTROLLER_NAME);
		$data = array('title' => '订单管理', 'create_title' => '新增订单');
		listview($controller, $model, $data);
	}
	public function edit() {
		$this->display();
	}
}
