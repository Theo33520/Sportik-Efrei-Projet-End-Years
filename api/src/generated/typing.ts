/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AthleteDto {
  competitions: CompetititonAthleteDto[];
  programDescription: string;
  programTitle: string;
  trainings: TrainingDto[];
}

export interface CompetitionDto {
  coachId?: string;
  /** @format date-time */
  date: string;
  id: string;
  location: string;
  title: string;
  users: string[];
}

export interface CompetititonAthleteDto {
  /** @format date-time */
  date: string;
  location: string;
  title: string;
}

export interface NotificationDto {
  description: string;
  name_sender: string;
  notification_id: string;
  read: boolean;
  receiverId: string;
  senderId: string;
  title: string;
}

export interface ProgramDto {
  athleteId: string[];
  coachId: string;
  countAthletes: number;
  description: string;
  id: string;
  title: string;
  trainings: TrainingDto[];
}

export type ProgramEntity = object;

export type SendAthleteCredentialsDto = object;

export interface TrainingDto {
  description: string;
  /** @format date-time */
  endDate: string;
  name: string;
  /** @format date-time */
  startDate: string;
}

export interface TrainingSessionDto {
  /** @format date-time */
  endDate: string;
  isCompleted: boolean;
  program: ProgramDto;
  /** @format date-time */
  startDate: string;
}

export interface TrainingSummaryDto {
  lastSessions: TrainingSessionDto[] | null;
  nextSession: string | null;
  sessionCount: number;
  totalDuration: number;
}

export interface UserDto {
  Age: number;
  address: string;
  athleteCategory: string;
  clubId: string;
  clubName: string;
  email: string;
  firstname: string;
  height: number;
  isLoggedIn: boolean;
  lastname: string;
  phoneNumber: string;
  role: string;
  user_id: string;
  weight: number;
}

export type UserEntity = object;

export interface UserProfileDto {
  email: string;
  firstname: string;
  isLoggedIn: boolean;
  lastname: string;
  role: string;
  user_id: string;
}

export interface UserRoleDto {
  /** User role */
  role: "ATHLETE" | "COACH" | "ADMINISTRATOR";
}

export interface UserSummaryDto {
  atheleteCount: number;
  clubName: string;
  nextCompetionLocation: string;
  nextCompetionName: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title API Documentation Sportik
 * @version 1.0
 * @contact
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   * @response `200` `void`
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  user = {
    /**
     * No description
     *
     * @tags user
     * @name GetUserFromToken
     * @request GET:/user/me
     * @response `200` `UserDto` Get user from token
     */
    getUserFromToken: (params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/user/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetAllUsers
     * @request GET:/user
     * @response `200` `(UserDto)[]` Get all users
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<UserDto[], any>({
        path: `/user`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserById
     * @request GET:/user/{id}
     * @response `200` `UserDto` Get user by id
     */
    getUserById: (id: string, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/user/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdateUser
     * @request PUT:/user/{id}
     * @response `200` `UserProfileDto` Update user
     */
    updateUser: (id: string, data: UserEntity, params: RequestParams = {}) =>
      this.request<UserProfileDto, any>({
        path: `/user/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserByIdToProfil
     * @request GET:/user/{id}/profile
     * @response `200` `UserProfileDto` Get  user by id to profil
     */
    getUserByIdToProfil: (id: string, params: RequestParams = {}) =>
      this.request<UserProfileDto, any>({
        path: `/user/${id}/profile`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name RegisterUser
     * @request POST:/user/register
     * @response `200` `void` Register user
     */
    registerUser: (data: UserEntity, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserRole
     * @request GET:/user/{id}/role
     * @response `200` `UserRoleDto` Get user role
     */
    getUserRole: (id: string, params: RequestParams = {}) =>
      this.request<UserRoleDto, any>({
        path: `/user/${id}/role`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name CreateUserWithRoleAthlete
     * @request POST:/user/register/athlete
     * @response `200` `UserDto` Create user with role Athlete
     */
    createUserWithRoleAthlete: (data: UserEntity, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/user/register/athlete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetAllCompetitionByCoachId
     * @request GET:/user/competition/coach/{coachId}
     * @response `200` `(CompetitionDto)[]` Get all competition by coach ID
     */
    getAllCompetitionByCoachId: (coachId: string, params: RequestParams = {}) =>
      this.request<CompetitionDto[], any>({
        path: `/user/competition/coach/${coachId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetAllCompetitionByAthleteId
     * @request GET:/user/competition/athlete/{athleteId}
     * @response `200` `(CompetitionDto)[]` Get all competition by athlete ID
     */
    getAllCompetitionByAthleteId: (
      athleteId: string,
      params: RequestParams = {},
    ) =>
      this.request<CompetitionDto[], any>({
        path: `/user/competition/athlete/${athleteId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetAllDataDashboardByCoachId
     * @request GET:/user/coach/dashboard/{coachId}
     * @response `200` `UserSummaryDto` Get all data dashboard by coach ID
     */
    getAllDataDashboardByCoachId: (
      coachId: string,
      params: RequestParams = {},
    ) =>
      this.request<UserSummaryDto, any>({
        path: `/user/coach/dashboard/${coachId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetAllProgramByAthleteId
     * @request GET:/user/data/athlete/{athleteId}
     * @response `200` `(AthleteDto)[]` Get all program by athlete ID
     */
    getAllProgramByAthleteId: (athleteId: string, params: RequestParams = {}) =>
      this.request<AthleteDto[], any>({
        path: `/user/data/athlete/${athleteId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  program = {
    /**
     * No description
     *
     * @tags program
     * @name GetAllPrograms
     * @request GET:/program
     * @response `200` `void`
     */
    getAllPrograms: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/program`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags program
     * @name GetProgramByUserId
     * @request GET:/program/{coachId}
     * @response `200` `ProgramDto` Returns the program for the specified user ID
     */
    getProgramByUserId: (coachId: string, params: RequestParams = {}) =>
      this.request<ProgramDto, any>({
        path: `/program/${coachId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags program
     * @name GetProgramsByCoachId
     * @request GET:/program/coach/{coachId}
     * @response `200` `(ProgramDto)[]` Returns an array of programs for the specified coach ID
     */
    getProgramsByCoachId: (coachId: string, params: RequestParams = {}) =>
      this.request<ProgramDto[], any>({
        path: `/program/coach/${coachId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags program
     * @name CreateANewProgram
     * @request POST:/program/create
     * @response `201` `ProgramDto` Returns the created program
     */
    createANewProgram: (data: ProgramEntity, params: RequestParams = {}) =>
      this.request<ProgramDto, any>({
        path: `/program/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags program
     * @name DeleteAProgram
     * @request POST:/program/delete/{id}
     * @response `200` `void` Returns a success message
     */
    deleteAProgram: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/program/delete/${id}`,
        method: "POST",
        ...params,
      }),
  };
  competition = {
    /**
     * No description
     *
     * @tags competition
     * @name GetAllCompetitions
     * @request GET:/competition
     * @response `200` `(CompetitionDto)[]` Returns a list of all competitions
     */
    getAllCompetitions: (params: RequestParams = {}) =>
      this.request<CompetitionDto[], any>({
        path: `/competition`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags competition
     * @name GetCompetitionsByUserId
     * @request GET:/competition/user/{userId}
     * @response `200` `(CompetitionDto)[]` Returns a list of competitions for a specific user
     */
    getCompetitionsByUserId: (userId: string, params: RequestParams = {}) =>
      this.request<CompetitionDto[], any>({
        path: `/competition/user/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags competition
     * @name CreateANewCompetition
     * @request POST:/competition/create
     * @response `200` `CompetitionDto` Returns the created competition
     */
    createANewCompetition: (params: RequestParams = {}) =>
      this.request<CompetitionDto, any>({
        path: `/competition/create`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags competition
     * @name DeleteACompetitionById
     * @request POST:/competition/delete/{id}
     * @response `200` `void` Deletes a competition by ID
     */
    deleteACompetitionById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/competition/delete/${id}`,
        method: "POST",
        ...params,
      }),
  };
  notification = {
    /**
     * No description
     *
     * @tags notification
     * @name GetAllNotifications
     * @request GET:/notification
     * @response `200` `NotificationDto` Get all notications
     */
    getAllNotifications: (params: RequestParams = {}) =>
      this.request<NotificationDto, any>({
        path: `/notification`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags notification
     * @name GetConversationByUserId
     * @request GET:/notification/{user_id}/conversations
     * @response `200` `(NotificationDto)[]` Get conversation by ID
     */
    getConversationByUserId: (userId: string, params: RequestParams = {}) =>
      this.request<NotificationDto[], any>({
        path: `/notification/${userId}/conversations`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  club = {
    /**
     * No description
     *
     * @tags club
     * @name GetAthletesByCoachId
     * @request GET:/club/{coachId}/athletes
     * @response `200` `void`
     */
    getAthletesByCoachId: (coachId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/club/${coachId}/athletes`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags club
     * @name GetCoachesByClubId
     * @request GET:/club/{clubId}/coaches
     * @response `200` `void`
     */
    getCoachesByClubId: (clubId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/club/${clubId}/coaches`,
        method: "GET",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogIn
     * @request POST:/auth/log-in
     * @response `200` `void`
     */
    authControllerLogIn: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/log-in`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @request POST:/auth/log-out
     * @response `200` `void`
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/log-out`,
        method: "POST",
        ...params,
      }),
  };
  trainingSession = {
    /**
     * No description
     *
     * @tags trainingSession
     * @name TrainingSessionControllerFindAll
     * @request GET:/trainingSession
     * @response `200` `void`
     */
    trainingSessionControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/trainingSession`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags trainingSession
     * @name TrainingSessionControllerFindByUserId
     * @request GET:/trainingSession/athlete/{userId}
     * @response `200` `void`
     */
    trainingSessionControllerFindByUserId: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/trainingSession/athlete/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags trainingSession
     * @name TrainingSessionControllerFindByUserIdCoach
     * @request GET:/trainingSession/coach/{userId}
     * @response `200` `void`
     */
    trainingSessionControllerFindByUserIdCoach: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/trainingSession/coach/${userId}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags trainingSession
     * @name TrainingSessionControllerSessionCompletedOnCurrentWeek
     * @request GET:/trainingSession/dashboardSummary/{userId}
     * @response `default` `TrainingSummaryDto`
     */
    trainingSessionControllerSessionCompletedOnCurrentWeek: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, TrainingSummaryDto>({
        path: `/trainingSession/dashboardSummary/${userId}`,
        method: "GET",
        ...params,
      }),
  };
  mail = {
    /**
     * No description
     *
     * @tags mail
     * @name SendAthleteCredentials
     * @request POST:/mail/send-athlete-credentials
     * @response `200` `string` Send athlete credentials via email
     */
    sendAthleteCredentials: (
      data: SendAthleteCredentialsDto,
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/mail/send-athlete-credentials`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
