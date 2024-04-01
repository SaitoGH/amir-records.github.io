
$(document).ready(function () {
    async function readFile() {
        const file_doc = "../extra/docs.xlsx";
        try {
            let file;
            file = await (await fetch(file_doc)).arrayBuffer();
            const wbDoc = XLSX.read(file);
            return wbDoc;
        } catch (err) {
            console.error(err);
        }
    }

   

    const app = Vue.createApp({
        data() {
            return {
                wbObj :  null,
                sheet_name : null,
                wbCurSheet : null,
                headers : null,
                row_elements : null,
                message : Vue.ref(''),
                stateInput : Vue.ref(''),
                platOpt : Vue.ref('')
            }
        },
        async created() {
            const th = this;
            this.wbObj = await readFile(); //set value when async
            this.sheet_name = this.wbObj.SheetNames;
            this.wbCurSheet = XLSX.utils.sheet_to_json((this.wbObj).Sheets['Malaysian Anime Stores'], {defval: ""});
            this.headers = XLSX.utils.sheet_to_json((this.wbObj).Sheets['Malaysian Anime Stores'], {header : 1})[0];
            let obsOptions = {
                rootMargin : '0px',
                threshold :  [0, 0.25, 0.50, 0.75, 1 ]
            }
            const observer = new IntersectionObserver(intCallback, obsOptions);
            function intCallback(entries, observer) {
                entries.forEach(entry =>{
                    entry.target.classList.toggle("anim-top", entry.isIntersecting);
                })
            }

            this.$nextTick(() => {
                let table = document.getElementById('table-wrapper');
                this.row_elements = table.querySelectorAll('tr');
                (this.row_elements).forEach((e)=> {
                    observer.observe(e);
                });
            });
            
        }
    })
    
    app.mount(".table-wrapper");
});