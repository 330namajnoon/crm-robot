const { default: puppeteer } = require("puppeteer");
const { execSync, exec } = require("child_process");

function createTestPipeline({ userName = "", projectName = "", branch = "", projectName2 = "", branch2 = "" }) {
    const PROJECTS_PATH = process.env.PROJECTS_PATH;
    return new Promise((resolve, reject) => {
        try {
            const testBranchName = `test${branch.replace(/[-._/@]/g, "").toLocaleLowerCase()}${projectName.replace(/[-._/@]/g, "").toLocaleLowerCase()}`;
            const testBranchName2 = `test${branch2.replace(/[-._/@]/g, "").toLocaleLowerCase()}${projectName2.replace(/[-._/@]/g, "").toLocaleLowerCase()}`;
            execSync(`git fetch --all && git checkout ${branch}`, { cwd: `${PROJECTS_PATH}/${projectName}` });
            const currentBranch = execSync(`git branch --show-current`, { cwd: `${PROJECTS_PATH}/${projectName}` });
            exec(`git branch -D ${testBranchName}`, { cwd: `${PROJECTS_PATH}/${projectName}` }, () => {
                execSync(`git checkout -b ${testBranchName}`, { cwd: `${PROJECTS_PATH}/${projectName}` });
                if (!!projectName2) {
                    exec(`cp .env.template_branches_test .env.${testBranchName} && cat .env.${testBranchName}`, { cwd: `${PROJECTS_PATH}/${projectName}` }, (error, stdout) => {
                        const env = stdout.toString().replace(/testapimcd/g, testBranchName2);
                        execSync(`echo "${env}" > .env.${testBranchName}`, { cwd: `${PROJECTS_PATH}/${projectName}` });
                        resolve(testBranchName)
                    });
                } else resolve(testBranchName);
            });
        } catch (error) {
            throw new Error(error);
        }
    });
}

async function testEntornBuilderService({ country = "es", userName = "sina", projectNames = ["midigi-backend-es", "midigi-api-es"], branchs = ["MCD-2219", "MCD-2219"] }) {
    
    try {
        const res = await Promise.all(projectNames.map((projectName, index) => {
            return new Promise(async (resolve, reject) => {
                const branch = branchs[index];
                try {     
                    const isCorrect = await createTestPipeline({ userName, projectName, branch, projectName2: projectNames[index + 1], branch2: branchs[index + 1] });
                    console.log(isCorrect);
                    resolve(isCorrect);
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }));

        console.log(res);
    } catch (error) {
        
    }
}

module.exports = testEntornBuilderService;
