'use client'

import { useRef } from 'react'
import { UploadCloud, FileText, Mail, Database } from 'lucide-react'

interface Props {
  transcript: string
  setTranscript: (text: string) => void

  meetingFile: File | null
  setMeetingFile: (file: File | null) => void

  crmFile: File | null
  setCrmFile: (file: File | null) => void

  emailFile: File | null
  setEmailFile: (file: File | null) => void

  onAnalyze: () => void
  disabled?: boolean
}

export function UploadCard({
  transcript,
  setTranscript,

  meetingFile,
  setMeetingFile,

  crmFile,
  setCrmFile,

  emailFile,
  setEmailFile,

  onAnalyze,
  disabled,
}: Props) {
  const meetingRef = useRef<HTMLInputElement>(null)
  const crmRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  return (
    <div className="rounded-2xl border border-border glass p-6">

      <div className="grid gap-4 md:grid-cols-3">

        {/* Meeting */}
        <div
          onClick={() => meetingRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary"
        >
          <FileText className="mx-auto mb-3 h-10 w-10 text-primary" />

          <h3 className="font-semibold">
              Meeting Transcript

          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            PDF / TXT
          </p>

          {meetingFile && (
            <p className="mt-3 text-xs text-green-500">
              {meetingFile.name}
            </p>
          )}

          <input
  ref={meetingRef}
  hidden
  type="file"
  accept=".pdf,.txt"
  onChange={(e) => {
    const file = e.target.files?.[0]

    console.log("Meeting Selected:", file)

    if (file) {
      console.log("Setting meeting file:", file.name)



      setMeetingFile(file)
    }
  }}
/>
        </div>

        {/* CRM */}
        <div
          onClick={() => crmRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary"
        >
          <Database className="mx-auto mb-3 h-10 w-10 text-cyan-400" />

          <h3 className="font-semibold">
            CRM Record
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            JSON / TXT
          </p>

          {crmFile && (
            <p className="mt-3 text-xs text-green-500">
              {crmFile.name}
            </p>
          )}

          <input
            ref={crmRef}
            hidden
            type="file"
            accept=".json,.txt"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setCrmFile(file)
            }}
          />
        </div>

        {/* Email */}
        <div
          onClick={() => emailRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary"
        >
          <Mail className="mx-auto mb-3 h-10 w-10 text-purple-400" />

          <h3 className="font-semibold">
            Customer Email
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            TXT
          </p>

          {emailFile && (
            <p className="mt-3 text-xs text-green-500">
              {emailFile.name}
            </p>
          )}

          <input
            ref={emailRef}
            hidden
            type="file"
            accept=".txt"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setEmailFile(file)
            }}
          />
        </div>

      </div>

      <textarea
        className="mt-6 h-56 w-full rounded-xl border border-border bg-background p-4"
        placeholder="Or paste meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      <button
  onClick={onAnalyze}
  disabled={disabled}
  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white"
>
        <UploadCloud className="h-5 w-5" />
        Analyze Customer Context
      </button>

    </div>
  )
}