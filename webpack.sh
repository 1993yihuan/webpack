Sys_starttime=$(date +%s)
type=$1
starttime=$(date '+%Y-%m-%d %H:%M:%S')

echo '\033[36m*****************************************\033[0m'
echo '\033[36m*      START HE YIHUAN BETA WEBPACK     *\033[0m'
echo '\033[36m*****************************************\033[0m'

export NODE_ENV=${type}
webpack

endttime=$(date '+%Y-%m-%d %H:%M:%S')
Sys_endttime=$(date +%s)

echo '\033[45;37m ======END HE YIHUAN BETA WEBPACK' $starttime' USE '$(($Sys_endttime-$Sys_starttime))'s======\033[0m'
