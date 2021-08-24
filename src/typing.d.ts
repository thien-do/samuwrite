declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export = classes;
	export default classes;
}
