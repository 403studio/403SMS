<?php
namespace Admin\Controller;
use Think\Controller;

class  GoodsController extends Controller {
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
		$data = array('title' => '商品管理', 'create_title' => '新增商品');
		listview($controller, $model, $data);
	}

	public function getGoods() {
		$model =  M(CONTROLLER_NAME);
		$list = $model->select();
		$data['goods'] = $list;
		$goodsCategory = M('GoodsCategory');
		$category = $goodsCategory->select();
		$data['category'] = $category;
		$this->ajaxReturn($data);
	}

	public function edit() {
		if ($_GET['id']) {
			$id = (int)$_GET['id'];
			$model =  M(CONTROLLER_NAME);
			$info = $model->where('id = '.$id)->find();
			$this->assign('info', $info);
		}
		$this->display();
	}

	public function showCategory() {
		$this->display('Public:goodsCategoryTree');
	}

	public function save() {
		$model =  M(CONTROLLER_NAME);
		$id = (int)$_POST['id'];
		$data['barcode'] = $_POST['barcode'];
		$data['plucode'] = $_POST['plucode'];
		$data['category_id'] = $_POST['category_id'];
		$data['category_name'] = $_POST['category_name'];
		$data['goods_name'] = $_POST['goods_name'];
		$data['unit'] = $_POST['unit'];
		$data['price'] = $_POST['price'];
		$data['logo'] = $_POST['logo'];
		if ($id) {
			$result = $model->where('id = '.$id)->save($data);
		} else {
			$result = $model->add($data);
		}
		if ($result) {
			$this->success('新增成功', '/index.php/Admin/Goods/index', 1);
		}
	}
}
