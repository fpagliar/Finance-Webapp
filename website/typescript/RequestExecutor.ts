/// <reference path="typings/jquery.d.ts" />

enum Method {
    GET, POST
};

class RequestExecutor {
 
  private authToken: string;
  private baseUrl: string;

  public constructor(authToken: string, baseUrl: string) {
    this.authToken = authToken;
    this.baseUrl = baseUrl;
  }

  private execute = (method: Method, api: string, data: object, onSuccess: (param: any) => void) => {
        const request = {
            method: Method[method],
            url: this.baseUrl + '/' + api,
            headers: {
                Authorization: this.authToken
            },
            contentType: 'application/json',
            success: onSuccess,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                // debugger;
                console.error('Error on request: ', Method[method], ' ', api, ' -> ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                debugger;
                // alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        };

        if (method == Method.POST) {
            request["data"] = JSON.stringify(data);
        }
        
        $.ajax(request);
  }

  public get = (api: string, onSuccess: (param: any) => void) => {
      this.execute(Method.GET, api, null, onSuccess);
  }

  public post = (api: string, data: object, onSuccess: (param: any) => void) => {
    this.execute(Method.POST, api, data, onSuccess);
  }
}
