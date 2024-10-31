type Call = {
  id: number;
  in_out: 0 | 1;
  date: string;
  date_notime: string;
  time: number;
  person_name: string;
  person_surname?: string;
  person_avatar?: string;
  contact_company?: string;
  from_number: string;
  to_number: string;
  source: string;
  status: string;
  record?: string;
  line_name?: string;
  partner_data?: {
    id: string;
    name: string;
    phone: string;
  };
};

export default Call;