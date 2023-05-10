export interface DoceboUserSearchResponse {
    data: DoceboUserSearchData;
    version: string;
    _links: any[];
}

export interface DoceboUserSearchData {
    items: DoceboUserSearchItem[];
    count: number;
    has_more_data: boolean;
    cursor: any;
    current_page: number;
    current_page_size: number;
    total_page_count: number;
    total_count: number;
    sort: DoceboUserSearchSort[];
}

export interface DoceboUserSearchItem {
    user_id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    uuid: string;
    is_manager: boolean;
    fullname: string;
    last_access_date: string;
    last_update: string;
    creation_date: string;
    status: string;
    avatar: string;
    language: string;
    lang_code: string;
    expiration_date: any;
    level: string;
    email_validation_status: string;
    send_notification: string;
    newsletter_optout: string;
    newsletter_optout_date: any;
    encoded_username: string;
    timezone: string;
    date_format: any;
    field_4: string;
    field_5: string;
    field_7: string;
    field_9: string;
    field_10: string;
    field_11: string;
    field_13: string;
    field_15: string;
    field_16: string;
    field_17: string;
    field_18: string;
    field_19: string;
    field_22: any;
    field_23: string;
    field_24: string;
    field_28: string;
    field_29: string;
    multidomains: string[];
    manager_names: Manager_Names;
    managers: any[];
    active_subordinates_count: number;
    actions: string[];
    expired: boolean;
}

export interface Manager_Names {
    _1: _1;
}

export interface _1 {
    manager_title: string;
    manager_name: any;
    manager_username: any;
}

export interface DoceboUserSearchSort {
    sort_attr: string;
    sort_dir: string;
}