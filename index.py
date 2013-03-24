import web, httplib2

urls = (
    '/(.*)', 'req'
)
app = web.application(urls, globals())
headers = {
    "Content-Type": "application/vnd.slc+json",
    "Accept": "application/vnd.slc+json",
    "Authorization": "bearer t-4bab26c4-a2f7-49d6-85d2-cc179637385d",
}

h = httplib2.Http(".cache")
class req:
    def GET(self, name):
        endpoint = "https://api.sandbox.inbloom.org/api/rest/v1.1/teachers/3abf2b1743a55952f4b558fbdd758d128b8850da_id/teacherSectionAssociations/sections"
        resp, content = h.request(endpoint, "GET",headers=headers)
        return content

if __name__ == "__main__":
    app.run()
