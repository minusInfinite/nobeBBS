export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ msg: "Not Logged In" });
    }
};
export const isAdmin = (req, res, next) => {
    if (req.user.is_admin) {
        next();
    }
    else {
        res.status(401).json({ msg: "Administrator Required" });
    }
};
