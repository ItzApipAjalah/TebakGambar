/*Handles loading a random image behind the grid*/

define(["jquery"], function($) {
    return {
        Imgloader: function() {
            /*Array to store all the possible images*/
            this.imginfo=new Array();

            /*Reads a local text file that contains info about each image, creates an image object and stores it in imginfo*/
            var currentObj = this;
            this.imgPromise = new Promise(function(resolve, reject) {
                $.get("resources/util/imginfo.txt", function(data) {

                    var lines=data.split("\n");

                    for(var i=0;i<lines.length;i++){
                        var info=lines[i].split("$");
                        if(info[0] != "") {
                            currentObj.imginfo[i]=
                                currentObj.createImage(info[0],info[1]);
                        }
                    };
                    resolve(currentObj.imginfo);
                },"text");
            });
            
            /*Creates a new image object with the specified url and the specified name*/
            this.createImage = function(url, name){
                var obj = new Object();
                obj.url = url;
                obj.name = name;
                return obj;
            }
        }
    }
});
