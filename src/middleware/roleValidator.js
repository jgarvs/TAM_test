
module.exports = {
        authRole: (role)=>{
                return (req, res, next) => {
                        if(res.activeUser.role !== role){
                                return res.status(401).send('Not Allowed');
                        }

                        next();
                }
        }
}