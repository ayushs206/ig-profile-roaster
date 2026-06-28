// For standard global CSS files
declare module "*.css";

// For CSS Modules (styles.module.css)
declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

// Optional: Add if you use SCSS/SASS
declare module "*.scss";
declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}
