<?php
namespace Admin\Controller;
use Think\Controller;

class  GoodsCategoryController extends Controller {
	public function getGoodsTree() {
		$model =  M(CONTROLLER_NAME);
		$categoryArr = $model->select();
		$data[] = array('id' => 0, 'name' => '商品分类', 'open' => 1);
		foreach ($categoryArr as $key => $category) {
			$data[] = array('id' => $category['id'], 'name' => $category['category_name'],'pId' => $category['parent_id'], 'open' => $category['open']);
		}
		$this->ajaxReturn($data);
	}

	public function saveGoodsCategory() {
		$model =  M(CONTROLLER_NAME);
		$model->create();
		echo $model->add();
	}

	public function createCategory() {
		$this->assign('parent_id', $_POST['parent_id']);
		$this->assign('parent_category_name', $_POST['parent_category_name']);
		$this->display();
	}
}
