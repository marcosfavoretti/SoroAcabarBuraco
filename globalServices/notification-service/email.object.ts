export class Email {
    to: string []
    from: string
    subject: string
    text: string
    constructor(to: string, subject: string, text: string) {
        this.to = [to]
        this.from = process.env.email
        this.subject = subject
        this.text = text
    }
}