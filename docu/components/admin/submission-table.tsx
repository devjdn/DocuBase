function SubmissionTable({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col max-w-full rounded-md border border-border *:px-4">
            {children}
        </div>
    );
}

function SubmissionTableHeader({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-row justify-between items-center border-b border-b-border py-4">
            {children}
        </div>
    );
}

function SubmissionTableBody({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col">
            {children}
        </div>
    );

}

function SubmissionTableRow({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-row justify-between items-center">
            {children}
        </div>
    );

}

function SubmissionTableColumn({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col overflow-x-auto whitespace-nowrap">
            {children}
        </div>
    )
}

export  {
    SubmissionTable,
    SubmissionTableHeader,
    SubmissionTableBody,
    SubmissionTableRow,
    SubmissionTableColumn,
}