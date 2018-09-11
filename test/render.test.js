import test from 'ava';
import {render} from '../lib/render';


const MODEL = {
	name: 'John Doe'
};

const PARRALELL_TESTS = [
	//`doctype html`, '<!DOCTYPE html>',
	[
		'Single element',
		'html',
		'<html></html>'
	], [
		'Single element with id',
		'body#id1',
		'<body id="id1"></body>'
	], [
		'Single element with single class',
		'main.className',
		'<main class="className"></main>'
	], [
		'Single element with two classes',
		'main.className1.className2',
		'<main class="className1 className2"></main>'
	], [
		'Single element with an attribute',
		'header[attribute="value"]',
		'<header attribute="value"></header>'
	], [
		'Single element with id, two classes and two attributes and javascript content',
		'nav#id.className1.className2[dataAttribute="value",attribute="value"] `My name is ${name}.`',
		'<nav attribute="value" class="className1 className2" data-attribute="value" id="id">My name is John Doe.</nav>'
	], [
		'Two elements',
		`h1\nh2`,
		`<h1></h1>\n<h2></h2>`
	]
];


for (const [title, input, output] of PARRALELL_TESTS) {
	test(
		title,
		(t) => {
		t.true(output === render(input, MODEL));
	});
} // for
