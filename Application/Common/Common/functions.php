<?php
function listview($controller, $model, $param) {
	$list = $model->select();
	$controller->assign('fields', $controller->fields);
	$controller->assign('list', $list);

	$controller->assign('title', $param['title']);
	$controller->assign('create_title', $param['create_title']);
	$controller->display('Public:list');
}