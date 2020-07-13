using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading;
using UnityEngine;

public class HandMovement : MonoBehaviour
{
    private GameObject player;
    private GameObject mouse;
    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.Find("Player");
        mouse = GameObject.Find("mouse");
    }

    // Update is called once per frame
    void Update()
    {
       
        Vector3 delta_direction_mouse = (transform.position - mouse.transform.position);
        print(delta_direction_mouse);
        transform.position = transform.position - (delta_direction_mouse * Time.deltaTime);
        Vector3 delta_direction_player = (transform.position - player.transform.position);
        if(delta_direction_player.x>1f || delta_direction_player.y >1f ||  delta_direction_player.x < -1f || delta_direction_player.y < -1f )
        {
            transform.position = transform.position - (delta_direction_player * 5 *Time.deltaTime);
        }

    }
}
