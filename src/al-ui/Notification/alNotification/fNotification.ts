import './fNotification.css'

export interface IfNotification {
    title?: string;
    body: string;
    variant: 'info' | 'error' | 'success' | 'warning';
    timeSecClose?: number;
    buttonClose?: boolean;
    id?: string
}

function generateUniqueId(): string {
    const timestamp: number = new Date().getTime();
    const randomPart: number = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomPart}`;
}

const fNotification = (
    {
        title,
        body,
        variant = 'info',
        timeSecClose,
        buttonClose = false,
        id,
    }: IfNotification
): Promise<string> => {
    return new Promise((resolve) => {
        let ico = ''

        switch (variant) {
            case 'info':
                ico = '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>'
                break
            case "success":
                ico = '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>'
                break
            case 'error':
                ico = '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'
                break
            case 'warning':
                ico = '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'
                break
        }
        const arrBody: string[] = []
        body.split('\n').map(opt => {
            arrBody.push(
                `<span>${opt}</span>`
            )
        })

        const randId = generateUniqueId()

        const idFuncBlockNot = 'f-function-block-notification-' + randId

        const not = `
            <div class='f-function-block-notification' id="${id === undefined ? idFuncBlockNot : id}">
                <div class='f-function-notification'>
                    <div class='f-function-notification-ico ${variant}-notification'>
                        <svg width="28" height="28" viewBox="0 0 16 16">
                            ${ico}
                        </svg>
                    </div>
                    <div class='f-function-notification-inside'>
                        <div class='f-function-notification-header'>
                            <h4>${title !== undefined ? title : ''}</h4>
                            ${buttonClose ? `<svg
                                                    width="25"
                                                    class="bi bi-x-lg primary close-not"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                </svg>` : ''}
                        </div>
                        <div class='f-function-notification-body'>
                             ${arrBody.join('')}
                        </div>
                    </div>
                   ${timeSecClose ? `<div class="f-notification-progress">
                       <div class="f-notification-progress-bar">
                            <div class="f-notification-progress-value ${variant}" id="f-notification-progress-value-${randId}" style="animation: notification-progress-animated ${timeSecClose}s linear;"/>
                       </div>
                   </div>` : ''}
                </div>
            </div>
        `

        let blockNotification: HTMLDivElement | null = document.querySelector(`#block-notification`)

        if (blockNotification === null) {
            blockNotification = document.createElement('div');
            blockNotification.id = 'block-notification'
            blockNotification.insertAdjacentHTML('afterbegin', not);
            document.body.appendChild(blockNotification);
        } else {
            blockNotification.insertAdjacentHTML("afterbegin", not);
        }

        if (buttonClose) {
            const el = window.document.querySelector(`#${idFuncBlockNot}`);
            if (el !== null) {
                const svgElement = el.querySelector('.close-not');
                if (svgElement !== null) {
                    svgElement.addEventListener('click', () => {
                        el.classList.remove('f-function-notification-visible');
                        el.classList.add('f-function-notification-hidden');
                        setTimeout(() => {
                            if (el.parentNode) {
                                el.parentNode.removeChild(el);
                            }
                        }, 1000); // Remove the element after 1 second
                    });
                }
            }
        }

        setTimeout(() => {
            const el = window.document.querySelector(`#${idFuncBlockNot}`);
            if (el !== null && el !== undefined) {
                el.className += " " + 'f-function-notification-visible';
            }
        });

        if (timeSecClose !== undefined) {
            const el = window.document.querySelector(`#${idFuncBlockNot}`);
            if (el !== null) {
                setTimeout(() => {
                    el.className = 'f-function-notification-hidden';
                }, (timeSecClose - 1) * 1000);
                setTimeout(() => {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }

                }, timeSecClose * 1000);
            }
        }

        resolve(`#${idFuncBlockNot}`)
    })
}

export default fNotification
