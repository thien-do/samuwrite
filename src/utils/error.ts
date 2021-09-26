class AppError extends Error {}

export const ERRORS = {
	editorNull: new AppError("Editor is not ready"),
	dropType: new AppError("Dropped content is not a file"),
	fileFolder: new AppError("Folder is not supported yet"),
	recentNull: new AppError("No recent file. This is coding error."),
	permission: new AppError("Permission is not granted"),
};
